<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <card>
    <card-table-heading>
      <action-edit @save="updateName" :text="app.name" />
    </card-table-heading>
    <card-table-body>
      <div
        v-for="field in fields"
        class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
      >
        <card-table-body-field-name>
          {{ field.name }}
          <button
            class="ml-4"
            v-if="field.button"
            @click.prevent.stop="field.onClick(field.name, field.value)"
          >
            <component
              :is="field.button"
              class="h-5 stroke-2 text-green hover:text-green-dark"
            />
          </button>
        </card-table-body-field-name>
        <card-table-body-field-value>
          {{ field.value }}
        </card-table-body-field-value>
      </div>
      <div
        class="items-start py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
      >
        <card-table-body-field-name>
          Private Keys
          <button class="ml-4">
            <plus-icon
              class="h-5 stroke-2 text-green hover:text-green-dark"
              @click.stop.prevent="addPrivateKey"
            />
          </button>
        </card-table-body-field-name>
        <card-table-body-field-list
          :items="privateKeys"
          button="Delete"
          @click="deleteKey"
        />
      </div>
      <div class="py-4 sm:py-5 sm:px-6">
        <dt>
          <button
            class="ml-auto flex items-center text-sm font-medium text-pinkDark hover:text-purple"
            @click.prevent.stop="deleteApp"
          >
            Delete App
            <trash-icon class="ml-2 h-5 stroke-2" />
          </button>
        </dt>
      </div>
    </card-table-body>
    <modal v-if="showSecretModal" @close="onCloseSecretModal">
      <div class="mt-6 grid place-content-center text-green-dark">
        <img
          class="mx-auto h-12 w-auto"
          sizes="(max-width: 392px) 100vw, 392px"
          srcset="
            ~/assets/images/png/pineapple-caution-w-200.png 200w,
            ~/assets/images/png/pineapple-caution-w-392.png 392w
          "
          src="~/assets/images/png/pineapple-caution-w-392.png"
          alt=""
        />
        <h3 class="mx-auto mt-4">Private Key Created</h3>
        <div class="mx-6 mx-auto mt-2 text-center text-xs">
          You know the drill, save your secret! It's already hashed and only
          available right now. <br />Protect with your life 😉.
        </div>
        <div class="my-6 text-sm">
          <div class="font-medium">ID</div>
          <div class="font-light">{{ newKey.id }}</div>
          <div class="mt-4 font-medium">Secret</div>
          <div class="font-light">{{ newKey.secret }}</div>
        </div>
      </div>
    </modal>
  </card>
</template>

<script setup lang="ts">
import { ArrowPathIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import ActionEdit from '~/components/action-edit.vue'
import Modal from '~/components/modal.vue'

definePageMeta({ layout: 'home-layout' })

const profile = useNuxtApp().$profile()
const id = useRoute().params.id as string
const app = await profile.getApp(id)

const cyclePublicKey = async (
  current: string | undefined
): Promise<string | undefined> => {
  if (current != null) await profile.deleteKey(current)
  return (await profile.createKey(id, true))?.id
}

const fields = ref([
  {
    name: 'Application ID',
    value: app?.appId,
  },
  {
    name: 'Last Modified',
    value:
      app?.modified != null ? new Date(app.modified).toDateString() : undefined,
  },
  {
    name: 'Publishing ID',
    value: undefined,
    button: ArrowPathIcon,
    onClick: async () => {
      fields.value[2].value = await cyclePublicKey(fields.value[2].value)
    },
  },
])

const privateKeys = ref<string[]>([])
const keys = await profile.getKeys(id)
keys?.forEach((key) => {
  if (!key.isPublic) privateKeys.value.push(key.id)
  else fields.value[2].value = key.id
})

const showSecretModal = ref(false)
const onCloseSecretModal = () => (showSecretModal.value = false)

let newKey
const addPrivateKey = async () => {
  const key = await profile.createKey(id, false)
  if (key != null) {
    privateKeys.value.push(key.id)
    newKey = key
    showSecretModal.value = true
  }
}

const deleteKey = async (id: string) => {
  console.log(id)
  await profile.deleteKey(id)
  privateKeys.value = privateKeys.value.filter((key) => key !== id)
}

const deleteApp = async () => {
  await profile.deleteApp(id)
  navigateTo('/project')
}

const updateName = async (name: string) =>
  await profile.updateApp(id, { name: name })
</script>
