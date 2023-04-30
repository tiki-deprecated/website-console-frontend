/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Registry } from '~/plugins/registry/registry'
import { Auth } from '~/plugins/account'

export { Registry }

export default defineNuxtPlugin((nuxtApp) => {
  const config: RegistryConfig = useAppConfig().registry
  const auth: Auth = useNuxtApp().$auth()
  const registry: Registry = new Registry(config, auth)
  return {
    provide: {
      registry: () => registry,
    },
  }
})
