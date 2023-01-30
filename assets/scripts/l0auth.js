/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ExpiredAuthSessionError, Oauth2Scheme } from '~auth/runtime'

const DEFAULTS = {
  clientId: 'console',
  autoLogout: false,
  server: 'https://auth.l0.mytiki.com/api/latest',
  home: '/',
  audience: [],
  endpoints: {
    otp: '/otp/start',
    revoke: '/oauth/revoke',
    token: '/oauth/token',
    userInfo: '/userinfo',
    refresh: '/oauth/token',
  },
  scope: [],
  token: {
    property: 'access_token',
    type: 'Bearer',
    name: 'Authorization',
    maxAge: 600,
    global: true,
    prefix: '_token.',
    expirationPrefix: '_token_expiration.',
  },
  refreshToken: {
    property: 'refresh_token',
    maxAge: 2592000,
    prefix: '_refresh_token.',
    expirationPrefix: '_refresh_token_expiration.',
  },
  user: {
    autoFetch: false,
  },
  otp: {
    property: 'deviceId',
    redirect: 'otp',
  },
  responseType: 'token',
}

export default class L0auth extends Oauth2Scheme {
  constructor(auth, options, ...defaults) {
    super(auth, options, ...defaults, DEFAULTS)
  }

  async otp(params) {
    const response = await this.$auth
      .request({
        method: 'post',
        url: this.options.endpoints.otp,
        baseURL: this.options.server,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: params.email,
          notAnonymous: true,
        },
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'otp' })
        return Promise.reject(error)
      })

    const username = getProp(response.data, this.options.otp.property)
    this.$auth.$storage.setUniversal('username.otp', username)
    this.$auth.ctx.redirect(this.options.otp.redirect)
  }

  async login(params) {
    if (!this.options.endpoints.token) {
      return
    }
    const deviceId = this.$auth.$storage.getUniversal('username.otp')
    const response = await this.$auth
      .request({
        method: 'post',
        url: this.options.endpoints.token,
        baseURL: this.options.server,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams({
          grant_type: 'password',
          username: deviceId,
          password: params.otp,
          scopes: this.scope,
          audience: this.options.audience,
          client_id: this.options.clientId,
        }),
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'login' })
        return Promise.reject(error)
      })

    const token = getProp(response.data, this.options.token.property)
    const refreshToken = getProp(
      response.data,
      this.options.refreshToken.property
    )

    if (!token || !token.length) {
      return
    }
    this.token.set(token)

    if (refreshToken && refreshToken.length) {
      this.refreshToken.set(refreshToken)
    }
    window.location.replace(this.options.home)
  }

  async refreshTokens() {
    const refreshToken = this.refreshToken
      .get()
      .replace(this.options.token.type + ' ', '')
    if (!refreshToken) {
      return
    }

    const refreshTokenStatus = this.refreshToken.status()
    if (refreshTokenStatus.expired()) {
      this.$auth.reset()
      throw new ExpiredAuthSessionError()
    }

    this.requestHandler.clearHeader()
    const response = await this.$auth
      .request({
        method: 'post',
        url: this.options.endpoints.token,
        baseURL: this.options.server,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams({
          refresh_token: refreshToken,
          scopes: this.scope,
          client_id: this.options.clientId,
          grant_type: 'refresh_token',
        }),
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'refreshToken' })
        return Promise.reject(error)
      })

    this.updateTokens(response)
    return response
  }

  async fetchUser() {
    if (!this.check().valid) {
      return
    }

    if (!this.options.endpoints.userInfo) {
      this.$auth.setUser({})
    }
    const response = await this.$auth
      .request({
        method: 'get',
        url: this.options.endpoints.userInfo,
        baseURL: this.options.server,
        headers: {
          Authorization: this.token.get(),
        },
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })

    this.$auth.setUser({
      email: response.data.email,
      uid: response.data.sub,
    })
  }

  async logout() {
    if (this.options.endpoints.revoke) {
      const token = this.refreshToken.get()
      await this.$auth
        .request({
          method: 'post',
          url: this.options.endpoints.revoke,
          baseURL: this.options.server,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: new URLSearchParams({
            token,
          }),
        })
        .catch((error) => {
          this.$auth.callOnError(error, { method: 'logout' })
          return Promise.reject(error)
        })
    }
    this.$auth.reset()
    window.location.replace(this.options.home)
  }

  mounted() {
    const { tokenExpired, refreshTokenExpired } = this.check(true)
    if (refreshTokenExpired || (tokenExpired && this.options.autoLogout)) {
      this.$auth.reset()
    }
    this.requestHandler.initializeRequestInterceptor(
      this.options.endpoints.token
    )
    return this.$auth.fetchUserOnce()
  }

  check(checkStatus) {
    const response = {
      valid: false,
      tokenExpired: false,
      refreshTokenExpired: false,
      isRefreshable: true,
    }
    const token = this.token.sync()
    this.refreshToken.sync()
    if (!token) {
      return response
    }
    if (!checkStatus) {
      response.valid = true
      return response
    }

    const tokenStatus = this.token.status()
    const refreshTokenStatus = this.refreshToken.status()
    if (refreshTokenStatus.expired()) {
      response.refreshTokenExpired = true
      return response
    }
    if (tokenStatus.expired()) {
      response.tokenExpired = true
      return response
    }
    response.valid = true
    return response
  }

  async updateUser(req) {
    if (!this.options.endpoints.userInfo) {
      return
    }
    await this.$auth
      .request({
        method: 'post',
        url: this.options.endpoints.userInfo,
        baseURL: this.options.server,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token.get(),
        },
        data: req,
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'updateUser' })
        return Promise.reject(error)
      })
    await this.fetchUser()
  }
}

// from runtime.js
function getProp(holder, propName) {
  if (!propName || !holder || typeof holder !== 'object') {
    return holder
  }
  if (propName in holder) {
    return holder[propName]
  }
  const propParts = Array.isArray(propName)
    ? propName
    : (propName + '').split('.')
  let result = holder
  while (propParts.length && result) {
    result = result[propParts.shift()]
  }
  return result
}
