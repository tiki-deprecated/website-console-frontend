<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <HeadingEdit :title="app.name" />
  </div>
</template>

<script setup lang="ts">
import HeadingEdit from '~/components/heading-edit.vue'

definePageMeta({
  layout: 'home-layout',
})

const { $getApp } = useNuxtApp()
const id = useRoute().params.id as string
const app = await $getApp(id)
</script>
