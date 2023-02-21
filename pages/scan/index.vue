<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="py-5 md:py-10">Scan</h1>
    <div>
      <label for="search" class="block text-sm font-light text-greenDark"
        >Enter an Application ID, Address, Block Hash, or Transaction
        Hash</label
      >
      <form
        class="relative mt-1 flex items-center"
        @submit.prevent.stop="onSubmit($refs.search.value)"
      >
        <input
          type="text"
          name="search"
          ref="search"
          id="search"
          class="block w-full rounded-md border-2 border-greenDark bg-gray bg-opacity-70 pr-12 backdrop-blur-md focus:border-greenDark focus:ring-0 sm:text-sm"
        />
        <div class="absolute inset-y-0 right-0 flex py-2 pr-1.5">
          <MagnifyingGlassIcon class="px-2 font-sans text-greenDark" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { SearchModel } from '@mytiki/l0-index-plugin'
import { navigateTo } from '#app'

definePageMeta({
  layout: 'home-layout',
})

const { $l0Index, $getToken } = useNuxtApp()
const onSubmit = async (search: string) => {
  const token = await $getToken()
  if (token != null) {
    const res: SearchModel[] = await $l0Index.search(token.accessToken, search)
    if (res.length > 0) {
      let path = `/scan/${res[0].appId}`
      if (res[0].address != null) path += `/${res[0].address}`
      if (res[0].blockHash != null) path += `/${res[0].blockHash}`
      if (res[0].txnHash != null) path += `/${res[0].txnHash}`
      navigateTo(path)
    }
  }
}
</script>
