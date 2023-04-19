/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as L0AuthPlugin from '@mytiki/l0-auth-plugin'

export class Profile {
  config: AccountConfig
  l0Auth: L0AuthPlugin.L0Auth
  getToken: () => Promise<string | undefined>

  constructor(
    config: AccountConfig,
    l0Auth: L0AuthPlugin.L0Auth,
    getToken: () => Promise<string | undefined>
  ) {
    this.config = config
    this.l0Auth = l0Auth
    this.getToken = getToken
  }

  getUser = async () => this.l0Auth.getUser(await this.getToken())

  updateUser = async (userId: string, req: L0AuthPlugin.UserReqUpdate) =>
    this.l0Auth.updateUser(userId, req, await this.getToken())

  createApp = async (req: L0AuthPlugin.AppReqUpdate) =>
    this.l0Auth.createApp(req, await this.getToken())

  getApp = async (appId: string) =>
    this.l0Auth.getApp(appId, await this.getToken())

  updateApp = async (appId: string, req: L0AuthPlugin.AppReqUpdate) =>
    this.l0Auth.updateApp(appId, req, await this.getToken())

  deleteApp = async (appId: string) =>
    this.l0Auth.deleteApp(appId, await this.getToken())

  getOrg = async (orgId: string) =>
    this.l0Auth.getOrg(orgId, await this.getToken())

  createKey = async (appId: string, isPublic: boolean) =>
    this.l0Auth.createKey(appId, isPublic, await this.getToken())

  getKeys = async (appId: string) =>
    this.l0Auth.getKeys(appId, await this.getToken())

  deleteKey = async (keyId: string) =>
    this.l0Auth.deleteKey(keyId, await this.getToken())
}
