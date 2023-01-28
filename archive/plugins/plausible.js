/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Plausible from 'plausible-tracker'

export default ({ app }, inject) => {
  const plausible = Plausible({
    domain: 'console.mytiki.com',
    trackLocalhost: false,
  })
  // plausible.enableAutoOutboundTracking()
  inject('plausible', plausible)
}
