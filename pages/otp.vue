<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <label>Otp</label>
        <input v-model="otp" type="text" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Otp',
  auth: false,
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

<style scoped></style>
