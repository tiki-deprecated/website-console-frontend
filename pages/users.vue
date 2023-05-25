<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1>Users</h1>
    <p class="text-black-xlight">if(users == ♡) you += $$$</p>
    <chart-users class="h-64 md:mt-20" />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'home-layout' })
</script>
