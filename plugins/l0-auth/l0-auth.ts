/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useCookie } from '#app'

const tokenState = 'accessToken'

interface L0AuthConfig {
  host: string
  worker: string
  cookie: string
  secure: boolean | undefined
  bypass: boolean | undefined
}

export default class L0Auth {
  config: L0AuthConfig

  constructor(config: L0AuthConfig) {
    this.config = config
  }

  async otp(email: string): Promise<boolean> {
    const req: L0AuthReqOtp = {
      email: email,
      notAnonymous: true,
    }

    const response = await fetch(this.config.host + '/api/latest/otp/start', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(req),
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })

    if (response.ok) {
      const otpRsp: L0AuthRspOtp = await response.json()
      useState<L0AuthRspOtp>('otp', () => otpRsp)
      return true
    } else {
      return false
    }
  }

  async grant(code: string): Promise<boolean> {
    const otpRsp = useState<L0AuthRspOtp>('otp').value
    const response = await fetch(this.config.host + '/api/latest/oauth/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        scope: 'auth',
        username: otpRsp.deviceId,
        password: code,
      }),
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })

    if (response.ok) {
      const tokenRsp: L0AuthRspToken = await response.json()
      this.saveToken(tokenRsp)
      return true
    } else {
      return false
    }
  }

  async isAuthorized(): Promise<boolean> {
    if (this.config.bypass) return true
    const accessToken = useState<L0AuthToken>(tokenState).value
    if (accessToken != null && accessToken.expires > new Date()) return true
    else {
      try {
        return await this.refresh()
      } catch (error: any) {
        return false
      }
    }
  }

  async getUser(): Promise<L0AuthRspUser | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(this.config.host + '/api/latest/user', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.accessToken,
      },
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async updateUser(
    userId: string,
    req: L0AuthReqUser
  ): Promise<L0AuthRspUser | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/user/' + userId,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
        body: JSON.stringify(req),
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async createApp(req: L0AuthReqApp): Promise<L0AuthRspApp | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(this.config.host + '/api/latest/app', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.accessToken,
      },
      body: JSON.stringify(req),
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async getApp(appId: string): Promise<L0AuthRspApp | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/app/' + appId,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async deleteApp(appId: string): Promise<any> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/app/' + appId,
      {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
  }

  async updateApp(
    appId: string,
    req: L0AuthReqApp
  ): Promise<L0AuthRspApp | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/app/' + appId,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
        body: JSON.stringify(req),
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async createKey(
    appId: string,
    isPublic: boolean
  ): Promise<L0AuthRspKey | L0AuthRspSecret | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/app/' + appId + '/key',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
        body: new URLSearchParams({
          isPublic: String(isPublic),
        }),
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async getKeys(appId: string): Promise<L0AuthRspKey[] | undefined> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/app/' + appId + '/key',
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    }
  }

  async deleteKey(keyId: string): Promise<any> {
    const accessToken = this.getToken()
    if (accessToken == null) return
    const response = await fetch(
      this.config.host + '/api/latest/key/' + keyId,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.accessToken,
        },
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
  }

  async logout(): Promise<any> {
    const accessToken = this.getToken()
    useState(tokenState, () => null)
    useCookie(this.config.cookie).value = null
    if (accessToken != null)
      await this.revoke(accessToken.accessToken, accessToken.refreshToken)
  }

  private async refresh(): Promise<boolean> {
    const response = await fetch(this.config.worker + '/api/latest/refresh', {
      method: 'post',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })

    if (response.ok) {
      const rsp: L0AuthRspToken = await response.json()
      this.saveToken(rsp)
      return true
    } else {
      return false
    }
  }

  private async revoke(
    accessToken: string,
    refreshToken: string
  ): Promise<any> {
    const response = await fetch(
      this.config.host + '/api/latest/oauth/revoke',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: new URLSearchParams({
          token: refreshToken,
        }),
      }
    ).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
  }

  private saveToken(tokenRsp: L0AuthRspToken) {
    const token: L0AuthToken = {
      accessToken: tokenRsp.access_token,
      refreshToken: tokenRsp.refresh_token,
      scope: tokenRsp.scope,
      expires: new Date(new Date().getTime() + tokenRsp.expires_in * 1000),
    }
    useState(tokenState, () => token)
    useCookie(this.config.cookie).value = token.refreshToken
    useCookie(this.config.cookie, {
      httpOnly: true,
      secure: this.config.secure ? true : undefined,
    })
  }

  private getToken(): L0AuthToken | undefined {
    const state = useState<L0AuthToken>(tokenState)
    if (state != null) return state.value
  }
}
