/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export { refresh }

interface L0AuthRspToken {
  access_token: string
  refresh_token: string
  scope: string
  token_type: string
  expires_in: number
}

async function refresh(
  url: string,
  refreshToken: string
): Promise<L0AuthRspToken> {
  const response: Response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  }).catch((error) => {
    console.log(error)
    return Promise.reject(error)
  })
  if (response.ok) return await response.json()
  else {
    return Promise.reject(response)
  }
}
