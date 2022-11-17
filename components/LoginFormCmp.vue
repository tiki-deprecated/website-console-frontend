<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="title">Log In / Sign Up</h1>
    <form @submit.prevent="submit">
      <input
        v-model="email"
        type="text"
        required
        placeholder="Email"
        class="input"
      />
      <button type="submit" class="submit">Continue</button>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'LoginFormCmp',
  data() {
    return {
      email: '',
    }
  },
  created() {
    this.submit = _.debounce(this.submit, 50)
  },
  methods: {
    async submit() {
      await this.$auth.getStrategy('l0auth').otp({ email: this.email })
    },
  },
}
</script>

<style scoped lang="sass">
@import "assets/styles/theme"
@import "assets/styles/mixins"

.title
  font-family: $font-family-koara
  margin: auto auto 30px auto
  width: fit-content
  text-align: center
  font-size: 2em

.input
  width: 100%
  border: $blue solid 2px
  border-radius: 10px
  text-align: center
  padding: 14px 20px
  font-family: $font-family-space-grotesk
  font-weight: 500
  box-sizing: border-box
  font-size: 1em
  margin-bottom: 30px
  caret-color: $green

.submit
  width: 100%
  border: $yellow solid 2px
  border-radius: 10px
  text-align: center
  padding: 14px 20px
  font-family: $font-family-space-grotesk
  font-weight: bold
  box-sizing: border-box
  font-size: 1em
  color: $blue
  background-color: $yellow

.submit:active
  background-color: rgba($yellow, 0.75)

.input:focus
  outline: $green
</style>
