<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="py-5 md:py-10">Projects</h1>
    <div v-if="apps.length > 0">
      <ul
        role="list"
        class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
      >
        <li v-for="project in projects" :key="project.appId">
          <nuxt-link :to="'project/' + project.appId">
            <Card>
              <div class="flex items-center">
                <div class="grid h-20 w-20 place-content-center">
                  <Identicon :value="project.appId" size-rem="4" />
                </div>
                <div class="flex-1 truncate py-2 pr-2 text-sm">
                  <h3 class="truncate">{{ project.name }}</h3>
                  <p
                    class="mt-1 whitespace-normal break-normal text-xs text-greenDark/80"
                  >
                    {{ project.appId }}
                  </p>
                </div>
              </div>
            </Card>
          </nuxt-link>
        </li>
        <li class="grid place-content-center">
          <button-std
            text="New Project"
            :icon="PlusIcon"
            :onClick="newProject"
          />
        </li>
      </ul>
    </div>
    <button
      v-if="apps.length === 0"
      type="button"
      class="relative block grid w-full place-content-center rounded-lg border-2 border-dashed border-greenDark p-12 text-center text-greenDark hover:border-green hover:text-green"
      @click.stop.prevent="newProject"
    >
      <squares-plus-icon class="mx-auto h-10" />
      <span class="mt-2 block text-sm font-medium">Create a new project</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, SquaresPlusIcon } from '@heroicons/vue/24/solid'
import ButtonStd from '~/components/button-std.vue'

definePageMeta({
  layout: 'home-layout',
})

let projects = ref<L0AuthRspApp[]>([])
const { $getUser, $getApp, $createApp, $createKey } = useNuxtApp()
const user = await $getUser()

let apps = ref<L0AuthRspApp[]>([])
for (const appId of user!.apps) {
  const app = await $getApp(appId)
  if (app != null) apps.value.push(app)
}
projects.value = apps.value.sort(
  (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
)

const newProject = async () => {
  const app = await $createApp({
    name: 'New Project',
  })
  if (app != null) {
    await $createKey(app.appId, true)
    apps.value.push(app)
  }
}
</script>
