<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <card>
    <div class="flex items-center px-4 py-5 sm:px-6">
      <action-edit
        :onSave="updateName"
        :text="app.name"
        class="text-xl font-light text-greenDark"
      />
    </div>
    <div class="border-t border-greenDark/20 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-greenDark/20">
        <div
          v-for="field in fields"
          class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
        >
          <dt class="flex items-center text-sm font-medium text-greenDark">
            {{ field.name }}
            <button
              class="ml-4"
              v-if="field.action"
              @click.prevent.stop="
                field.action.onClick(field.name, field.value)
              "
            >
              <component
                :is="field.action.icon"
                class="h-5 stroke-2 text-green hover:text-greenDark"
              />
            </button>
          </dt>
          <dd class="mt-1 text-sm text-greenDark sm:col-span-2 sm:mt-0">
            {{ field.value }}
          </dd>
        </div>
        <div
          class="items-start py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
        >
          <dt class="flex items-center text-sm font-medium text-greenDark">
            Private Keys
            <button class="ml-4">
              <plus-icon
                class="h-5 stroke-2 text-green hover:text-greenDark"
                @click.stop.prevent="addPrivateKey"
              />
            </button>
          </dt>
          <dd class="mt-1 text-sm text-greenDark sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              v-if="privateKeys.length > 0"
              class="divide-y divide-greenDark/20 rounded-md border border-greenDark/20"
            >
              <li
                v-for="id in privateKeys"
                :key="id"
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div class="flex w-0 flex-1 items-center">
                  <span class="ml-2 w-0 flex-1 truncate">{{ id }}</span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <button
                    class="font-medium text-green hover:text-greenDark"
                    @click.stop.prevent="deleteKey(id)"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </dd>
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
      </dl>
    </div>
    <modal v-if="showSecretModal" :onClose="onCloseSecretModal">
      <div class="mt-6 grid place-content-center text-greenDark">
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

definePageMeta({
  layout: 'home-layout',
})

const { $getApp, $getKeys, $deleteApp, $createKey, $deleteKey, $updateApp } =
  useNuxtApp()
const id = useRoute().params.id as string
const app = await $getApp(id)

const cyclePublicKey = async (
  current: string | undefined
): Promise<string | undefined> => {
  if (current != null) await $deleteKey(current)
  return (await $createKey(id, true))?.id
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
    action: {
      icon: ArrowPathIcon,
      onClick: async () => {
        fields.value[2].value = await cyclePublicKey(fields.value[2].value)
      },
    },
  },
])

const privateKeys = ref<string[]>([])
const keys = await $getKeys(id)
keys?.forEach((key) => {
  if (!key.isPublic) privateKeys.value.push(key.id)
  else fields.value[2].value = key.id
})

const showSecretModal = ref(false)
const onCloseSecretModal = () => (showSecretModal.value = false)

let newKey
const addPrivateKey = async () => {
  const key = await $createKey(id, false)
  if (key != null) {
    privateKeys.value.push(key.id)
    newKey = key
    showSecretModal.value = true
  }
}

const deleteKey = async (id: string) => {
  await $deleteKey(id)
  privateKeys.value = privateKeys.value.filter((key) => key !== id)
}

const deleteApp = async () => {
  await $deleteApp(id)
  navigateTo('/project')
}

const updateName = async (name: string) =>
  await $updateApp(id, {
    name: name,
  })
</script>
