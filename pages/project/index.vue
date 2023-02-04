<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <HeadingAdd title="Projects" />
    <div>
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
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>
