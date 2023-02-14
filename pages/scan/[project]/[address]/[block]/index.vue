<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <card>
    <card-table-heading>Block</card-table-heading>
    <card-table-body>
      <div
        v-for="field in fields"
        class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
      >
        <card-table-body-field-name>
          {{ field.name }}
        </card-table-body-field-name>
        <card-table-body-field-value>
          {{ field.value }}
        </card-table-body-field-value>
      </div>
      <div
        class="items-start py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
      >
        <dt class="text-sm font-medium text-greenDark">Transactions</dt>
        <card-table-body-field-list
          :items="hashes"
          button="Open"
          @click="open"
        />
      </div>
    </card-table-body>
  </card>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

definePageMeta({
  layout: 'home-layout',
})

const { $l0Index, $getToken } = useNuxtApp()
const project = useRoute().params.project as string
const address = useRoute().params.address as string
const blockHash = useRoute().params.block as string

const open = (txn: string) =>
  navigateTo(`/scan/${project}/${address}/${blockHash}/${txn}`)

const fields = ref<Object[]>([])
const hashes = ref<string[]>([])

const token = await $getToken()
if (token != null) {
  const blockModel = await $l0Index.block(token.accessToken, {
    appId: project,
    address: address,
    blockHash: blockHash,
  })
  fields.value.push({
    name: 'Hash',
    value: blockModel.hash,
  })
  fields.value.push({
    name: 'Timestamp',
    value: blockModel.timestamp,
  })
  fields.value.push({
    name: 'Address',
    value: blockModel.address,
  })
  fields.value.push({
    name: 'Project',
    value: blockModel.appId,
  })
  fields.value.push({
    name: 'Src',
    value: blockModel.url,
  })
  fields.value.push({
    name: 'Version',
    value: String(blockModel.version),
  })
  fields.value.push({
    name: 'Previous Block',
    value: blockModel.previous,
  })
  fields.value.push({
    name: 'Signature',
    value: blockModel.signature,
  })
  fields.value.push({
    name: 'Total Transactions',
    value: String(blockModel.transactions.length),
  })
  fields.value.push({
    name: 'Merkle Root',
    value: blockModel.transactionRoot,
  })
  hashes.value = blockModel.transactions
}
</script>
