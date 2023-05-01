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

  async getUsage(day?: Date) {
    if (day == null) day = new Date()
    const accessToken = (await this.auth.getToken())?.accessToken
    const response = await fetch(
      this.config.host + `/api/latest/usage?day=${day.toISOString()}`,
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
