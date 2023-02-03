/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const isAuthorized: boolean = await useNuxtApp().$isAuthorized()
  if (
    to.name !== 'login' &&
    to.name !== 'otp' &&
    to.name !== undefined &&
    !isAuthorized
  )
    return navigateTo('/login')
})