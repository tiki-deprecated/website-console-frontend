/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { AuthToken } from '~/plugins/account/auth-token'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token: AuthToken | undefined = await useNuxtApp().$auth().getToken()
  if (
    to.name !== 'index' &&
    to.name !== 'otp' &&
    to.name !== 'checkout' &&
    to.name !== undefined &&
    token === undefined
  )
    return navigateTo('/')

  if (to.name === 'index' && token !== undefined) return navigateTo('/project')
})
