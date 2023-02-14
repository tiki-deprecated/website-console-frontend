<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <card>
    <card-table-heading>Transaction</card-table-heading>
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
    </card-table-body>
  </card>
</template>

<script setup lang="ts">
import {
  TxnContentSchemaEnum,
  TxnContentsModel,
  TxnContentsModelConsent,
  TxnContentsModelOwnership,
} from '@mytiki/l0-index-plugin'

definePageMeta({
  layout: 'home-layout',
})

const { $l0Index, $getToken } = useNuxtApp()
const project = useRoute().params.project as string
const address = useRoute().params.address as string
const blockHash = useRoute().params.block as string
const txnHash = useRoute().params.txn as string

const fields = ref<Object[]>([])

const token = await $getToken()
if (token != null) {
  const txnModel = await $l0Index.transaction(token.accessToken, {
    appId: project,
    address: address,
    blockHash: blockHash,
    txnHash: txnHash,
  })
  fields.value.push({
    name: 'Hash',
    value: txnModel.hash,
  })
  fields.value.push({
    name: 'Timestamp',
    value: txnModel.timestamp,
  })
  fields.value.push({
    name: 'Block',
    value: txnModel.block,
  })
  fields.value.push({
    name: 'Address',
    value: txnModel.address,
  })
  fields.value.push({
    name: 'Project',
    value: txnModel.appId,
  })
  fields.value.push({
    name: 'Src',
    value: txnModel.url,
  })
  fields.value.push({
    name: 'Version',
    value: String(txnModel.version),
  })
  fields.value.push({
    name: 'Asset Ref',
    value: txnModel.assetRef,
  })
  fields.value.push({
    name: 'Signature',
    value: txnModel.signature,
  })

  const schema = txnModel.contentSchema
  fields.value.push({
    name: 'Schema',
    value: schema,
  })
  if (schema == TxnContentSchemaEnum.CONSENT) {
    const contents = txnModel.contents as TxnContentsModelConsent
    fields.value.push({
      name: 'Ownership Transaction',
      value: contents.ownershipId,
    })
    fields.value.push({
      name: 'Destination',
      value: contents.destination,
    })
    fields.value.push({
      name: 'About',
      value: contents.about,
    })
    fields.value.push({
      name: 'Reward',
      value: contents.reward,
    })
    fields.value.push({
      name: 'Expiry',
      value: contents.expiry,
    })
    fields.value.push({
      name: 'Raw',
      value: contents.raw,
    })
  } else if (schema == TxnContentSchemaEnum.OWNERSHIP) {
    const contents = txnModel.contents as TxnContentsModelOwnership
    fields.value.push({
      name: 'Source',
      value: contents.source,
    })
    fields.value.push({
      name: 'Type',
      value: contents.type,
    })
    fields.value.push({
      name: 'Origin',
      value: contents.origin,
    })
    fields.value.push({
      name: 'About',
      value: contents.about,
    })
    fields.value.push({
      name: 'Contains',
      value: contents.contains,
    })
    fields.value.push({
      name: 'Raw',
      value: contents.raw,
    })
  } else {
    const contents = txnModel.contents as TxnContentsModel
    fields.value.push({
      name: 'Raw',
      value: contents.raw,
    })
  }
}
</script>
