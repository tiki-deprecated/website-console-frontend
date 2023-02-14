<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <card>
    <card-table-heading>Project</card-table-heading>
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
          Addresses<br />{{ page.page * page.size }} to
          {{ page.page * page.size + page.items }}
        </dt>
        <card-table-body-field-list
          :items="addresses"
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
const open = (address: string) => navigateTo(`/scan/${project}/${address}`)

const fields = ref<Object[]>([])
const addresses = ref<string[]>([])
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
    const app = await $l0Index.app(token.accessToken, project, {
      page: page.value.page,
      size: page.value.size,
    })
    fields.value.push({
      name: 'ID',
      value: app.appId,
    })
    fields.value.push({
      name: 'Total Addresses',
      value: String(app.addresses.totalAddresses),
    })
    addresses.value = app.addresses.addresses
    page.value = {
      page: app.addresses.page,
      size: page.value.size,
      totalPages: app.addresses.totalPages,
      items: app.addresses.addresses.length,
      totalItems: app.addresses.totalAddresses,
    }
  }
}
update(0)
</script>
