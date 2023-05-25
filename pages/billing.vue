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
        :class="`${hasLmsm || hasIgt ? 'bg-transparent' : 'bg-white'}`"
        :action="{
          text: 'no cc required',
          bgColor: 'bg-transparent',
          textColor: 'text-black-xlight',
        }"
        :description="{
          name: 'FREE',
          text: 'All of the features under the &ldquo;I Got This&rdquo; plan are free up to 1,000 users.',
          price: '0',
        }"
        :features="[
          {
            text: 'Includes 1,000 users',
          },
        ]"
      />
      <card-buy
        :class="`${hasIgt ? 'bg-white' : 'bg-transparent'}`"
        :action="{
          text: hasIgt ? 'manage plan' : 'buy plan',
          bgColor: hasIgt ? 'bg-transparent' : 'bg-black',
          textColor: hasIgt ? 'bg-black' : 'text-yellow-dark',
          href: hasIgt ? portal : igtCheckout,
        }"
        :description="{
          name: '&ldquo;I Got This&rdquo;',
          text: 'For those who know how to use ZPD to improve ops like ROAS & eCPM.',
          price: '10+',
        }"
        :features="[
          {
            text: 'Includes 10,000 users',
          },
          {
            text: 'Immutable license storage',
          },
          {
            text: 'Mobile & web SDKs',
          },
          {
            text: 'API access',
          },
          {
            text: 'Integrations',
          },
          {
            text: 'Email & chat support',
          },
          {
            icon: PlusCircleIcon,
            text: '$10/mo per additional 10,000 users',
            color: 'text-black-xlight',
          },
        ]"
      />
      <card-buy
        :class="`${hasLmsm ? 'bg-white' : 'bg-transparent'}`"
        :action="{
          text: hasLmsm ? 'manage plan' : 'buy plan',
          bgColor: hasLmsm ? 'bg-transparent' : 'bg-black',
          textColor: hasLmsm ? 'bg-black' : 'text-yellow-dark',
          href: hasLmsm ? portal : lmsmCheckout,
        }"
        :description="{
          name: '&ldquo;Let&rsquo;s Make Some Money&rdquo;',
          text: 'Designed for businesses looking to add revenue with ZPD. Includes &ldquo;I Got This&rdquo;.',
          price: '833+',
        }"
        :features="[
          {
            text: 'Includes 100,000 users',
          },
          {
            text: 'Our data buyer network',
          },
          {
            text: 'ZPD capture tools',
          },
          {
            text: 'Data enrichment and pooling',
          },
          {
            text: 'Custom integrations',
          },
          {
            text: 'User identity validation',
          },
          {
            text: 'Live onboarding and support',
          },
          {
            icon: PlusCircleIcon,
            text: '$10/mo per additional 25,000 users',
            color: 'text-black-xlight',
          },
          {
            icon: PlusCircleIcon,
            text: '15% commission on our data buyers',
            color: 'text-black-xlight',
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
import { PlusCircleIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'home-layout' })
const auth: Auth = useNuxtApp().$auth()
const billing: BillingClient = useNuxtApp().$billing()
const subscriptions = await billing.subscription(
  (
    await auth.getToken()
  )?.accessToken
)

const hasIgt = billing.hasIgtSubscription(subscriptions)
const hasLmsm = billing.hasLmsmSubscription(subscriptions)
const hasLmsmao = billing.hasLmsmaoSubscription(subscriptions)

let portal = undefined
if (hasIgt || hasLmsm)
  portal = await billing.portal((await auth.getToken())?.accessToken)

if (hasLmsm && !hasLmsmao)
  await billing.checkoutlmsmao((await auth.getToken())?.accessToken)

let igtCheckout = undefined
if (!hasIgt)
  igtCheckout = await billing.checkoutIgt((await auth.getToken())?.accessToken)

let lmsmCheckout = undefined
if (!hasLmsm)
  lmsmCheckout = await billing.checkoutlmsm(
    (
      await auth.getToken()
    )?.accessToken
  )
</script>
