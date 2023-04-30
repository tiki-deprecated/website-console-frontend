/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useCookie } from '#app'
import * as L0AuthPlugin from '@mytiki/l0-auth-plugin'
import { AuthToken } from './auth-token'

const tokenState = 'accessToken'

export class Auth {
  config: AccountConfig
  l0Auth: L0AuthPlugin.L0Auth

  constructor(config: AccountConfig, l0Auth: L0AuthPlugin.L0Auth) {
    this.config = config
    this.l0Auth = l0Auth
  }

  async requestOtp(email: string): Promise<boolean> {
    try {
      await this.l0Auth.requestOtp(email)
      return true
    } catch (error) {
      return false
    }
  }

  async redeemOtp(code: string): Promise<boolean> {
    try {
      const rsp: L0AuthPlugin.TokenRsp = await this.l0Auth.redeemOtp(
        code,
        'auth registry:admin'
      )
      this.saveToken(rsp)
      return true
    } catch (error) {
      return false
    }
  }

  async getToken(): Promise<AuthToken | undefined> {
    const accessToken = useState<AuthToken>(tokenState)
    if (accessToken.value != null && accessToken.value.expires > new Date())
      return accessToken.value
    else {
      try {
        return await this.refresh()
      } catch (error: any) {
        return undefined
      }
    }
  }

  async logout(): Promise<any> {
    const refreshToken = useCookie(this.config.cookie).value
    const accessToken = await this.getToken()
    if (refreshToken != null && accessToken != null) {
      await this.l0Auth.revokeToken(refreshToken, accessToken.accessToken)
    }
    useState(tokenState, () => null)
  }

  private async refresh(): Promise<AuthToken> {
    let rsp: L0AuthPlugin.TokenRsp
    if (this.config.debug === true) {
      const refreshToken = useCookie(this.config.cookie).value
      rsp = await this.l0Auth.refreshToken(refreshToken ?? '')
    } else {
      const response = await fetch(this.config.worker + '/api/latest/refresh', {
        method: 'post',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      }).catch((error) => {
        return Promise.reject(error)
      })
      if (response.ok) {
        rsp = await response.json()
      } else {
        const error: L0AuthPlugin.ErrorRsp = await response.json()
        return Promise.reject(error)
      }
    }
    return this.saveToken(rsp)
  }

  private saveToken(tokenRsp: L0AuthPlugin.TokenRsp): AuthToken {
    const token: AuthToken = {
      accessToken: tokenRsp.access_token,
      scope: tokenRsp.scope,
      expires: new Date(new Date().getTime() + tokenRsp.expires_in * 1000),
    }
    useState(tokenState, () => token)
    if (this.config.debug === true) {
      useCookie(this.config.cookie).value = tokenRsp.refresh_token
    } else {
      useCookie(this.config.cookie, {
        //httpOnly: true,
        secure: true,
      }).value = tokenRsp.refresh_token
    }
    return token
  }
}
