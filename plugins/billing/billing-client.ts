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

  checkoutIgt = (accessToken?: string): Promise<string> =>
    this.checkout(this.config.stripe.igtProductId, accessToken)

  checkoutlmsm = (accessToken?: string): Promise<string> =>
    this.checkout(this.config.stripe.lmsmProductId, accessToken)

  checkoutlmsmao = (accessToken?: string): Promise<string> =>
    this.checkout(this.config.stripe.lmsmaoProductId, accessToken)

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

  hasIgtSubscription = (subscriptions: Array<Object>): boolean =>
    this.hasSubscription(subscriptions, this.config.stripe.igtProductId)

  hasLmsmSubscription = (subscriptions: Array<Object>): boolean =>
    this.hasSubscription(subscriptions, this.config.stripe.lmsmProductId)

  hasLmsmaoSubscription = (subscriptions: Array<Object>): boolean =>
    this.hasSubscription(subscriptions, this.config.stripe.lmsmaoProductId)

  async subscription(accessToken?: string): Promise<Array<Object>> {
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
      return await response.json()
    } else {
      return Promise.reject(response)
    }
  }

  private hasSubscription(
    subscriptions: Array<Object>,
    productId: string
  ): boolean {
    for (let index in subscriptions) {
      const sub: any = subscriptions[index]
      if (sub.plan != null && sub.plan.product === productId)
        return sub.status === 'active'
    }
    return false
  }

  private async checkout(
    productId: string,
    accessToken?: string
  ): Promise<string> {
    const response = await fetch(
      `${this.config.host}/api/latest/billing/checkout?product=${productId}`,
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
    if (response.status === 200) {
      const json = await response.json()
      return json.url
    } else if (response.status === 201) {
      return ''
    } else {
      return Promise.reject(response)
    }
  }
}
