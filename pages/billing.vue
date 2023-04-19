<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="py-5 md:py-10">Billing</h1>
    <div class="mx-auto mt-10">
      <div
        class="flex w-full flex-wrap items-center lg:mx-auto lg:w-3/4 lg:flex-nowrap lg:justify-evenly"
      >
        <subscription title="FREE" :is-selected="!state.hasSubscription">
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
import TwoItems from '~/components/subscription-details/two-items.vue'
import SinglePrice from '~/components/subscription-details/single-price.vue'

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
