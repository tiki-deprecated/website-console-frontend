<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="title">Enter Code</h1>
    <p class="subtitle">
      Passwords suck. We’ve emailed you a one-time use code. Enter it below.
    </p>
    <form @submit.prevent="submit">
      <input
        v-model="otp"
        type="text"
        class="input"
        required
        placeholder="Code"
      />
      <button type="submit" class="submit">Continue</button>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'OtpFormCmp',
  data() {
    return {
      otp: '',
    }
  },
  created() {
    this.submit = _.debounce(this.submit, 50)
  },
  methods: {
    async submit() {
      await this.$auth.loginWith('l0auth', {
        otp: this.otp,
      })
    },
  },
}
</script>

<style scoped lang="sass">
@import "archive/assetsets/styles/theme"
@import "archive/assetsets/styles/mixins"

.title
  font-family: $font-family-koara
  margin: auto auto 0 auto
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
  outline-color: $green

.subtitle
  text-align: center
  margin-bottom: 30px
</style>
