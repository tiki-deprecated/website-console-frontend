<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <div class="mb-10 flex flex-wrap items-center justify-between">
      <h1>Projects</h1>
      <button
        type="button"
        class="mt-8 flex items-center rounded-md border border-black bg-transparent py-3 px-5 text-sm text-black hover:shadow-sm lg:mt-0"
        @click.prevent.stop="newProject"
      >
        <plus-icon class="mr-3 h-5" />
        Add Project
      </button>
    </div>
    <div v-if="apps.length > 0">
      <ul role="list" class="mt-3 flex flex-wrap gap-5 md:gap-6">
        <li v-for="project in projects" :key="project.appId">
          <nuxt-link :to="'project/' + project.appId">
            <card class="w-full p-4 hover:shadow-md lg:w-64">
              <div class="mb-4 grid h-[4rem] w-[4rem] place-content-center">
                <Identicon :value="project.appId" size-rem="4" />
              </div>
              <p class="font-bold text-blue">{{ project.name }}</p>
              <p class="mt-1 whitespace-normal break-normal text-black-xlight">
                {{ project.appId }}
              </p>
            </card>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <button
      v-if="apps.length === 0"
      type="button"
      class="relative block grid w-full place-content-center rounded-lg border-2 border-dashed border-green-dark p-12 text-center text-green-dark hover:border-green hover:text-green"
      @click.stop.prevent="newProject"
    >
      <squares-plus-icon class="mx-auto h-10" />
      <span class="mt-2 block text-sm font-medium">Create a new project</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, SquaresPlusIcon } from '@heroicons/vue/24/solid'
import { AppRsp } from '@mytiki/l0-auth-plugin'
import { Profile } from '~/plugins/account'

definePageMeta({ layout: 'home-layout' })

let projects = ref<AppRsp[]>([])
const profile: Profile = useNuxtApp().$profile()
const user = await profile.getUser()
const org = await profile.getOrg(user!.orgId)

let apps = ref<AppRsp[]>([])
for (const appId of org!.apps) {
  const app = await profile.getApp(appId)
  apps.value.push(app)
}
projects.value = apps.value.sort(
  (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
)

const newProject = async () => {
  const app = await profile.createApp({
    name: 'New Project',
  })
  await profile.createKey(app.appId, true)
  apps.value.push(app)
}
</script>
