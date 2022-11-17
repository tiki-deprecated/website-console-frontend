<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <div class="field1">
      <div class="label">API ID</div>
      <div class="field">
        <div class="value">{{ apiId }}</div>
        <div class="button" @click.prevent="cycleApiId">
          <utils-svg-cmp name="refresh" class="icon" />
        </div>
      </div>
    </div>
    <div>
      <div class="label">HOSTED BACKUP</div>
      <div class="field">
        <div class="value">{{ prefix }}</div>
        <div class="button" @click.prevent="listBucket">
          <utils-svg-cmp name="list" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import { sha3_256 } from 'js-sha3'
import UtilsSvgCmp from '~/components/UtilsSvgCmp'
import { generate, getIds, revoke } from '~/scripts/l0storage'
import { hex2b64url } from '~/scripts/b64url'

export default {
  name: 'ActDetailsCmp',
  components: { UtilsSvgCmp },
  data() {
    return {
      apiId: '',
      prefix: '',
    }
  },
  async mounted() {
    this.apiId = await this.getApiId()
    const b64 = hex2b64url(sha3_256(this.$auth.user.uid))
    this.prefix = 'https://bucket.storage.l0.mytiki.com/?prefix=' + b64
  },
  methods: {
    async getApiId() {
      let latest = await this.getLatestValid()
      if (latest == null) {
        await this.generate()
        latest = await this.getLatestValid()
      }
      return latest != null ? latest : 'Contact Support'
    },
    async getLatestValid() {
      const ids = await getIds(this.$auth.strategy.token.get())
      if (ids != null && ids.length > 0) {
        const latest = {}
        for (let i = 0; i < ids.length; i++) {
          if (
            ids[i].valid &&
            (ids[i].modified < latest.modified || latest.modified == null)
          ) {
            latest.modified = ids[i].modified
            latest.apiId = ids[i].apiId
          }
        }
        return latest.apiId
      } else return null
    },
    async generate() {
      await generate(this.$auth.strategy.token.get())
      this.ids = await getIds(this.$auth.strategy.token.get())
    },
    async cycleApiId() {
      await revoke(this.$auth.strategy.token.get(), this.apiId)
      this.apiId = await this.getApiId()
    },
    listBucket() {
      window.location.href = this.prefix
    },
  },
}
</script>

<style scoped lang="sass">
@import "assets/styles/theme"
@import "assets/styles/mixins"

.label
  font-weight: bold

.value
  background-color: $white
  border-radius: 10px
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  overflow-wrap: break-word
  text-align: left

.field
  display: flex
  align-items: center

::v-deep .icon.svg
  fill: $white
  height: auto
  width: 1.5em

.button
  position: relative
  background-color: $green-dark
  border-radius: 10px
  cursor: pointer

.button:active
  background-color: rgba($green-dark, .75)

.icon
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

@include for-phone
@include for-tablet
  .value
    font-size: 1.2em
    height: 40px
    width: 450px
    line-height: 40px
    padding: 0 12px
    margin-right: 10px

  .button
    height: 40px
    width: 40px

  .label
    margin-bottom: 5px

  .field1
    margin-bottom: 20px
</style>
