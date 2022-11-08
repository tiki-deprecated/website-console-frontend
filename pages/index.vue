<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1>hello world</h1>
    <form @submit.prevent="logout">
      <div>
        <button type="submit">Logout</button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'IndexPage',
  created() {
    this.logout = _.debounce(this.logout, 50)
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
