<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="title">Account Details:</h1>
    <div class="label">EMAIL</div>
    <div class="field">
      <div id="email" class="value" :contenteditable="canEdit">{{ email }}</div>
      <div class="button" @click.prevent="toggleEdit">
        <utils-svg-cmp :name="editIcon" class="icon" />
      </div>
    </div>
    <div class="buttons">
      <div class="logoutBtnCnt" @click.prevent="logout">Logout</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ActDetailsCmp',
  data() {
    return {
      email: '',
      canEdit: false,
    }
  },
  computed: {
    editIcon() {
      return this.canEdit ? 'save' : 'pencil'
    },
  },
  created() {
    this.toggleEdit = _.debounce(this.toggleEdit, 50)
  },
  mounted() {
    this.email = this.$auth.user.email
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    async toggleEdit() {
      if (this.canEdit === true) {
        const requestedEmail = document.getElementById('email').innerText
        await this.$auth.getStrategy('l0auth').updateUser({
          email: requestedEmail,
        })
        this.email = this.$auth.user.email
      }
      this.canEdit = !this.canEdit
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

.value:focus
  outline: none

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

.logoutBtnCnt
  display: flex
  font-weight: bold
  align-items: center
  background-color: $green-dark
  justify-content: center
  border-radius: 10px
  cursor: pointer
  color: $white

.logoutBtnCnt:hover
  background-color: rgba($green-dark, .75)

.logoutBtnCnt:active
  background-color: $green

@include for-phone
  .title
    font-size: 1.4em
    text-align: center
    margin-bottom: 50px

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

  .title
    font-size: 1.2em
    text-align: left
    margin-bottom: 30px

  .logoutBtnCnt
    font-size: 1em
    padding: 14px 30px
    width: 125px
    margin: 0 25px 0 0

  .buttons
    display: flex

  .field
    margin-bottom: 30px
</style>
