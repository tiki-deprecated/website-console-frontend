/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { StripeConfig } from '~/plugins/billing/stripe-config'

export interface BillingConfig {
  host: string
  stripe: StripeConfig
}
