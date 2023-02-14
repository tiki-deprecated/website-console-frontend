<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <card>
    <card-table-heading>Address</card-table-heading>
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
        <dt class="text-sm font-medium text-greenDark">
          Blocks<br />{{ page.page * page.size }} to
          {{ page.page * page.size + page.items }}
        </dt>
        <card-table-body-field-list
          :items="hashes"
          button="Open"
          @click="open"
        />
        <div
          class="col-span-3 flex items-center justify-end text-right text-greenDark"
        >
          <button
            class="mr-2 text-green hover:text-greenDark"
            v-if="page.page > 0"
            @click.prevent.stop="update(page.page - 1)"
          >
            <ArrowLeftIcon class="h-5 stroke-2" />
          </button>
          Page {{ page.page + 1 }} of {{ page.totalPages }}
          <button
            v-if="page.page < page.totalPages - 1"
            class="ml-2 text-green hover:text-greenDark"
            @click.prevent.stop="update(page.page + 1)"
          >
            <ArrowRightIcon class="h-5 stroke-2" />
          </button>
        </div>
      </div>
    </card-table-body>
  </card>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { navigateTo } from '#app'

definePageMeta({
  layout: 'home-layout',
})

const { $l0Index, $getToken } = useNuxtApp()
const project = useRoute().params.project as string
const address = useRoute().params.address as string
const open = (block: string) =>
  navigateTo(`/scan/${project}/${address}/${block}'`)

const fields = ref<Object[]>([])
const hashes = ref<string[]>([])
const page = ref({
  page: 0,
  size: 25,
  totalPages: 0,
  items: 0,
  totalItems: 0,
})

const update = async (pageNumber: number) => {
  const token = await $getToken()
  if (token != null) {
    const addr = await $l0Index.address(
      token.accessToken,
      {
        appId: project,
        address: address,
      },
      {
        page: pageNumber,
        size: page.value.size,
      }
    )
    fields.value.push({
      name: 'Address',
      value: addr.address,
    })
    fields.value.push({
      name: 'Project',
      value: addr.appId,
    })
    fields.value.push({
      name: 'Total Blocks',
      value: String(addr.blocks.totalHashes),
    })
    hashes.value = addr.blocks.hashes
    page.value = {
      page: addr.blocks.page,
      size: page.value.size,
      totalPages: addr.blocks.totalPages,
      items: addr.blocks.hashes.length,
      totalItems: addr.blocks.totalHashes,
    }
  }
}
update(0)
</script>
