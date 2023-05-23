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
    <div
      class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      <card-buy
        :is-active="false"
        name="Freelancer"
        description="The essentials
      to provide your best work for clients."
        :price="0"
        :items="[
          {
            text: '5 products',
          },
          {
            text: 'Up to 1,000 subscribers',
          },
          {
            text: 'Basic analytics',
          },
          {
            text: '48-hour support response time',
          },
        ]"
      />
      <card-buy
        :is-active="true"
        name="Startup"
        description="A plan that scales with your rapidly growing business."
        :price="30"
        :items="[
          {
            text: '25 products',
          },
          {
            text: 'Up to 10,000 subscribers',
          },
          {
            text: 'Advanced analytics',
          },
          {
            text: '24-hour support response time',
          },
          {
            text: 'Marketing automations',
          },
        ]"
      />
      <card-buy
        :is-active="false"
        name="Enterprise"
        description="Dedicated support and infrastructure for your company."
        :price="833"
        :items="[
          {
            text: 'Unlimited products',
          },
          {
            text: 'Unlimited subscribers',
          },
          {
            text: 'Advanced analytics',
          },
          {
            text: '1-hour, dedicated support response time',
          },
          {
            text: 'Marketing automations',
          },
          {
            text: 'Custom reporting tools',
          },
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BillingClient } from '~/plugins/billing/billing-client'
import { Auth } from '~/plugins/account'
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
