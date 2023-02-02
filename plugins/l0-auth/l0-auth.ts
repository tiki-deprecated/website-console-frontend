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

  async logout(): Promise<any> {
    const accessToken = useState<L0AuthToken>(tokenState).value
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

  //user
  //app
  //getToken
  //revoke

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
}
