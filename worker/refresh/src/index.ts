/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Headers } from '@cloudflare/workers-types'
import * as l0Auth from './l0-auth'

export interface Env {
  L0_AUTH_URL: string
  COOKIE: string
  ORIGIN: string
  SECURE: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      guardMethod(request, env)
      const refreshToken = getRefreshToken(request.headers, env)
      if (refreshToken != null) {
        const accessToken = await l0Auth.refresh(env.L0_AUTH_URL, refreshToken)
        let headers: Record<string, string> = getCorsHeaders(env.ORIGIN)
        headers['Set-Cookie'] =
          env.COOKIE +
          '=' +
          accessToken.refresh_token +
          '; HttpOnly' +
          (env.SECURE === 'true' ? '; SECURE' : '')
        return Response.json(accessToken, {
          status: 200,
          headers: headers,
        })
      } else
        return Response.json(
          { message: 'Missing cookie: ' + env.COOKIE },
          {
            status: 400,
            headers: getCorsHeaders(env.ORIGIN),
          }
        )
    } catch (error: any) {
      if (error instanceof Response) return error
      else {
        return Response.json(
          {
            message: error.toString(),
          },
          { status: 500 }
        )
      }
    }
  },
}

function guardMethod(request: Request, env: Env): any {
  if (request.method === 'OPTIONS') {
    throw new Response(null, {
      status: 200,
      headers: getCorsHeaders(env.ORIGIN),
    })
  } else if (request.method !== 'POST') {
    throw Response.json({ message: 'Not Allowed' }, { status: 405 })
  }
}

function getRefreshToken(headers: Headers, env: Env): string | null {
  const cookieHeader = headers.get('cookie')
  const raw = cookieHeader
    ?.split(';')
    .filter((c) => c.trim().startsWith(env.COOKIE + '='))
    .pop()
  if (raw != null) {
    return raw.split('=')[1]
  } else return null
}

function getCorsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Credentials': 'true',
  }
}
