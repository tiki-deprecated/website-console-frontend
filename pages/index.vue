<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <Heading title="Projects">
      <button
        type="button"
        class="ml-6 bg-green text-white hover:bg-white/70 hover:text-green"
      >
        <PlusIcon class="h-8" />
      </button>
    </Heading>
    <div>
      <ul
        role="list"
        class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
      >
        <li v-for="project in projects" :key="project.appId">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'home-layout',
})

let projects = ref<L0AuthRspApp[]>([])

const { $getUser, $getApp } = useNuxtApp()
const user = await $getUser()
for (const appId of user!.apps) {
  const app = await $getApp(appId)
  if (app != null) projects.value.push(app)
}

// const projects = [
//   {
//     name: 'Graph API',
//     href: '#',
//     id: 'f30e452e-a442-11ed-a8fc-0242ac120002',
//   },
//   {
//     name: 'Component Design',
//     href: '#',
//     id: 'f30e497a-a442-11ed-a8fc-0242ac120002',
//   },
//   {
//     name: 'Templates',
//     href: '#',
//     id: 'f30e4b78-a442-11ed-a8fc-0242ac120002',
//   },
//   {
//     name: 'React Components FUKAKFEF',
//     href: '#',
//     id: 'f30e4d58-a442-11ed-a8fc-0242ac120002',
//   },
// ]
</script>
