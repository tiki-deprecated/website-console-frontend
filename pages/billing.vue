<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1>What's the cost, boss?</h1>
    <p class="text-black-xlight">
      For meticulously crafted SDKs, APIs, and docs.
    </p>
    <div class="mx-auto md:mt-20">
      <div
        class="flex w-full flex-wrap items-center md:mx-auto md:w-3/4 md:flex-nowrap md:justify-center"
      >
        <subscription
          title="FREE"
          :is-selected="!state.hasSubscription"
          class="my-10"
        >
          <single-price
            price="$0"
            text="Full access to play with and build against, up to 1k users."
            :is-selected="!state.hasSubscription"
          />
        </subscription>
        <subscription
          title="PRO"
          :is-selectable="true"
          :is-selected="state.hasSubscription"
          @select="onSelect"
          ><two-items
            price1="$0.001"
            text1="per user, per month."
            price2="$0.01"
            text2="one time, per new user."
            :is-selected="state.hasSubscription"
            :is-selectable="true"
        /></subscription>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BillingClient } from '~/plugins/billing/billing-client'
import { Auth } from '~/plugins/account'
import TwoItems from '~/components/subscription/details/two-items.vue'
import SinglePrice from '~/components/subscription/details/single-price.vue'
import { definePageMeta } from '#imports'
import { useNuxtApp } from '#app'
import { reactive } from '@vue/reactivity'

definePageMeta({ layout: 'home-layout' })
const auth: Auth = useNuxtApp().$auth()
const billing: BillingClient = useNuxtApp().$billing()

const state = reactive({
  hasSubscription: false,
})

billing.hasSubscription((await auth.getToken())?.accessToken).then((status) => {
  state.hasSubscription = status
})

const onSelect = async () => {
  let url
  if (state.hasSubscription)
    url = await billing.portal((await auth.getToken())?.accessToken)
  else url = await billing.checkout((await auth.getToken())?.accessToken)
  window.location.href = url
}
</script>
