/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { hasAuth } from '~/composables/auth-state'

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.name !== 'login' &&
    to.name !== 'otp' &&
    to.name !== undefined &&
    !hasAuth()
  )
    return navigateTo('/login')
})
