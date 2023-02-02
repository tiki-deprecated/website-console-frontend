<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <button @click.stop.prevent="logout">logout</button>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { $logout } = useNuxtApp()

const logout = async () => {
  await $logout()
  navigateTo('/login')
}
</script>
