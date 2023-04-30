/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Auth } from '~/plugins/account'

export class Registry {
  config: RegistryConfig
  auth: Auth

  constructor(config: RegistryConfig, auth: Auth) {
    this.config = config
    this.auth = auth
  }

  async getUsage(month?: number, year?: number) {
    const now = new Date()
    if (month == null) month = now.getMonth() + 1
    if (year == null) year = now.getFullYear()
    const accessToken = (await this.auth.getToken())?.accessToken
    const response = await fetch(
      this.config.host + `/api/latest/usage?month=${month}&year=${year}`,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ).catch((error) => {
      return Promise.reject(error)
    })
    if (response.ok) {
      return await response.json()
    } else {
      const error = await response.json()
      return Promise.reject(error)
    }
  }
}
