/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as L0AuthPlugin from '@mytiki/l0-auth-plugin'
import { Auth } from './auth'
import { Profile } from './profile'

export { Auth, Profile }

export default defineNuxtPlugin((nuxtApp) => {
  const config: AccountConfig = useAppConfig().account
  const l0Auth: L0AuthPlugin.L0Auth = new L0AuthPlugin.L0Auth({
    host: config.host,
  })

  const auth = new Auth(config, l0Auth)
  const profile = new Profile(
    config,
    l0Auth,
    async (): Promise<string | undefined> => {
      return (await auth.getToken())?.accessToken
    }
  )

  return {
    provide: {
      auth: () => auth,
      profile: () => profile,
    },
  }
})
