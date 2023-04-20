/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { BillingConfig } from '~/plugins/billing/billing-config'

export class BillingClient {
  config: BillingConfig

  constructor(config: BillingConfig) {
    this.config = config
  }

  async checkout(accessToken?: string): Promise<string> {
    const response = await fetch(
      this.config.host + '/api/latest/billing/checkout',
      {
        method: 'get',
        redirect: 'follow',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ).catch((error) => {
      return Promise.reject(error)
    })
    if (response.ok) {
      const json = await response.json()
      return json.url
    } else {
      return Promise.reject(response)
    }
  }

  async portal(accessToken?: string): Promise<string> {
    const response = await fetch(this.config.host + '/api/latest/billing', {
      method: 'get',
      redirect: 'manual',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).catch((error) => {
      return Promise.reject(error)
    })
    if (response.ok) {
      const json = await response.json()
      return json.url
    } else {
      return Promise.reject(response)
    }
  }

  async hasSubscription(accessToken?: string): Promise<boolean> {
    const response = await fetch(
      this.config.host + '/api/latest/billing/subscriptions',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ).catch((error) => {
      return Promise.reject(error)
    })
    if (response.ok) {
      const subscription = await response.json()
      return subscription.status === 'active'
    } else {
      return false
    }
  }
}
