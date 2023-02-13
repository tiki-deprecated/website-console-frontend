/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token: L0AuthToken | undefined = await useNuxtApp().$getToken()

  if (
    to.name !== 'index' &&
    to.name !== 'otp' &&
    to.name !== undefined &&
    token === undefined
  )
    return navigateTo('/')

  if (to.name === 'index' && token !== undefined) return navigateTo('/project')
})
