<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1>hello world</h1>
    <ul v-if="ids.size > 0">
      <li v-for="(id, index) in ids" :key="index">
        {{ id.apiId }} - {{ id.valid }}
      </li>
    </ul>
    <a @click.prevent="generate">generate</a>
    <form class="logout" @submit.prevent="logout">
      <div>
        <button type="submit">Logout</button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'
import { generate, getIds } from '~/scripts/l0storage'

export default {
  name: 'IndexPage',
  data() {
    return {
      ids: [],
    }
  },
  created() {
    this.logout = _.debounce(this.logout, 50)
  },
  async mounted() {
    this.ids = await getIds(this.$auth.strategy.token.get())
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    async generate() {
      await generate(this.$auth.strategy.token.get())
      this.ids = await getIds(this.$auth.strategy.token.get())
    },
  },
}
</script>

<style scoped>
.logout {
  margin-top: 100px;
}
</style>
