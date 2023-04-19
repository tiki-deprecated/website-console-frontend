/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { BillingConfig } from '~/plugins/billing/billing-config'
import { BillingClient } from '~/plugins/billing/billing-client'

export default defineNuxtPlugin((nuxtApp) => {
  const config: BillingConfig = useAppConfig().billing
  const billingClient = new BillingClient(config)

  return {
    provide: {
      billing: () => billingClient,
    },
  }
})
