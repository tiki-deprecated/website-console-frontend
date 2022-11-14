<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <label>Email</label>
        <input v-model="email" type="text" />
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
  name: 'Login',
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

<style scoped lang="sass"></style>
