<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-greenLight bg-opacity-75 backdrop-blur-md"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-white"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XCircleIcon
                      class="h-8 w-8 text-greenDark"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <img
                    class="h-12 w-auto"
                    sizes="(max-width: 349px) 100vw, 576px"
                    srcset="
                      ~/assets/images/png/pineapple-jump-w-200.png 200w,
                      ~/assets/images/png/pineapple-jump-w-576.png 349w
                    "
                    src="~/assets/images/png/pineapple-jump-w-576.png"
                    alt="TIKI"
                  />
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <a
                    v-for="item in pages"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'text-green'
                        : 'text-greenDark hover:text-green',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'fill-green'
                          : 'fill-greenDark group-hover:fill-green',
                        'mr-3 h-6 w-6 flex-shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                  <divider class="border-greenDark"
                    ><LinkIcon class="my-4 h-4 bg-white fill-greenDark"
                  /></divider>
                  <a
                    v-for="item in links"
                    :key="item.name"
                    :href="item.href"
                    class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-greenDark hover:text-green"
                  >
                    <component
                      :is="item.icon"
                      class="mr-3 h-5 w-6 flex-shrink-0 fill-greenDark group-hover:fill-green"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </nav>
              </div>
              <div class="flex flex-row-reverse justify-evenly px-2 py-4">
                <a
                  v-for="item in actions"
                  :key="item.name"
                  :href="item.href"
                  class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-pinkDark hover:text-pink"
                >
                  <component
                    :is="item.icon"
                    class="mr-3 h-5 w-6 flex-shrink-0 fill-pinkDark group-hover:fill-pink"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0"></div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-40 md:flex-col">
      <div class="flex min-h-0 flex-1 flex-col bg-white">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img
              class="h-12 w-auto"
              sizes="(max-width: 349px) 100vw, 576px"
              srcset="
                ~/assets/images/png/pineapple-jump-w-200.png 200w,
                ~/assets/images/png/pineapple-jump-w-576.png 349w
              "
              src="~/assets/images/png/pineapple-jump-w-576.png"
              alt="TIKI"
            />
          </div>
          <nav class="mt-5 flex-1 space-y-1 bg-white px-2">
            <a
              v-for="item in pages"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current ? 'text-green' : 'text-greenDark hover:text-green',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'fill-green'
                    : 'fill-greenDark group-hover:fill-green',
                  'mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
            <divider class="border-greenDark"
              ><LinkIcon class="my-4 h-4 bg-white fill-greenDark"
            /></divider>
            <a
              v-for="item in links"
              :key="item.name"
              :href="item.href"
              class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-greenDark hover:text-green"
            >
              <component
                :is="item.icon"
                class="mr-3 h-5 w-6 flex-shrink-0 fill-greenDark group-hover:fill-green"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
          </nav>
        </div>
        <div class="px-2 py-4">
          <a
            v-for="item in actions"
            :key="item.name"
            :href="item.href"
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-pinkDark hover:text-pink"
          >
            <component
              :is="item.icon"
              class="mr-3 h-5 w-6 flex-shrink-0 fill-pinkDark group-hover:fill-pink"
              aria-hidden="true"
            />
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-40">
      <div
        class="bg-gray-100 sticky top-0 z-10 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden"
      >
        <button
          type="button"
          class="text-gray-500 hover:text-gray-900 focus:ring-indigo-500 -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-gray-900 text-2xl font-semibold">Dashboard</h1>
          </div>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <div
                class="border-gray-200 h-96 rounded-lg border-4 border-dashed"
              />
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  ArrowLeftCircleIcon,
  Bars3Icon,
  CheckBadgeIcon,
  Cog8ToothIcon,
  LinkIcon,
  MagnifyingGlassCircleIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
} from '@heroicons/vue/24/solid'
import { XCircleIcon } from '@heroicons/vue/24/outline'

import DiscordIcon from '~/assets/images/svg/discord.svg'
import GitHubIcon from '~/assets/images/svg/github.svg'
import ReadmeIcon from '~/assets/images/svg/readme.svg'
import CatIcon from '~/assets/images/svg/cat.svg'
import Divider from '~/components/divider.vue'

const pages = [
  { name: 'Projects', href: '#', icon: SquaresPlusIcon, current: true },
  {
    name: 'Scan',
    href: '#',
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
  { name: 'Settings', href: '#', icon: Cog8ToothIcon, current: false },
]

const links = [
  { name: 'Docs', href: '#', icon: ReadmeIcon },
  { name: 'Changelog', href: '#', icon: MegaphoneIcon },
  { name: 'Discord', href: '#', icon: DiscordIcon },
  { name: 'GitHub', href: '#', icon: GitHubIcon },
  { name: 'Status', href: '#', icon: CheckBadgeIcon },
]

const actions = [
  { name: 'Halp !!!', href: '#', icon: CatIcon },
  { name: 'Logout', href: '#', icon: ArrowLeftCircleIcon },
]

const sidebarOpen = ref(false)
</script>

<style lang="postcss">
html,
body,
div#__nuxt {
  @apply h-full;
}

html {
  @apply bg-white;
}
</style>
