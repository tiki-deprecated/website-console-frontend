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
          <div class="fixed inset-0 backdrop-blur-md" />
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
              class="relative flex w-full max-w-xs flex-1 flex-col bg-white/70"
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
                    sizes="(max-width: 576px) 100vw, 576px"
                    srcset="
                      ~/assets/images/png/pineapple-jump-w-200.png 200w,
                      ~/assets/images/png/pineapple-jump-w-576.png 576w
                    "
                    src="~/assets/images/png/pineapple-jump-w-576.png"
                    alt="TIKI"
                  />
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <nuxt-link
                    v-for="item in pages"
                    :key="item.name"
                    :to="item.href"
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
                  </nuxt-link>
                  <divider class="border-greenDark"
                    ><div class="rounded-full bg-greenDark p-1">
                      <LinkIcon class="h-4 w-4 fill-white" />
                    </div>
                  </divider>
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
                  class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-pinkDark/70 hover:text-pinkDark"
                >
                  <component
                    :is="item.icon"
                    class="mr-3 h-5 w-6 flex-shrink-0 fill-pinkDark/70 group-hover:fill-pinkDark"
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
      <div class="flex min-h-0 flex-1 flex-col bg-transparent">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img
              class="h-12 w-auto"
              sizes="(max-width: 576px) 100vw, 576px"
              srcset="
                ~/assets/images/png/pineapple-jump-w-200.png 200w,
                ~/assets/images/png/pineapple-jump-w-576.png 576w
              "
              src="~/assets/images/png/pineapple-jump-w-576.png"
              alt="TIKI"
            />
          </div>
          <nav class="mt-5 flex-1 space-y-1 bg-transparent px-2">
            <nuxt-link
              v-for="item in pages"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current ? 'text-white' : 'hover:white text-white/70',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'fill-white'
                    : 'fill-white/70 group-hover:fill-white',
                  'mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </nuxt-link>
            <divider class="border-white/50"
              ><div class="rounded-full bg-white/30 p-1 backdrop-blur-lg">
                <LinkIcon class="h-4 w-4 fill-white" />
              </div>
            </divider>
            <a
              v-for="item in links"
              :key="item.name"
              :href="item.href"
              class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white/70 hover:text-white"
            >
              <component
                :is="item.icon"
                class="mr-3 h-5 w-6 flex-shrink-0 fill-white/70 group-hover:fill-white"
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
            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-pinkDark/50 hover:text-pinkDark"
          >
            <component
              :is="item.icon"
              class="mr-3 h-5 w-6 flex-shrink-0 text-pinkDark/50 group-hover:fill-pinkDark"
              aria-hidden="true"
            />
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-40">
      <div
        class="sticky top-0 z-10 bg-white/70 pl-1 pt-1 backdrop-blur-lg sm:pl-3 sm:pt-3 md:hidden"
      >
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-pink"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-10 w-10" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="mx-8 py-8 md:pt-24 lg:px-40 lg:pt-32">
          <slot />
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
  { name: 'Projects', href: '/', icon: SquaresPlusIcon, current: true },
  {
    name: 'Scan',
    href: '/scan',
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
  { name: 'Settings', href: '/settings', icon: Cog8ToothIcon, current: false },
]

const links = [
  { name: 'Docs', href: 'https://docs.mytiki.com', icon: ReadmeIcon },
  {
    name: 'Changelog',
    href: 'https://docs.mytiki.com/changelog',
    icon: MegaphoneIcon,
  },
  { name: 'Discord', href: 'https://discord.gg/tiki', icon: DiscordIcon },
  { name: 'GitHub', href: 'https://github.com/tiki', icon: GitHubIcon },
  { name: 'Status', href: 'https://status.mytiki.com', icon: CheckBadgeIcon },
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
  @apply !h-fit min-h-full;
}

html {
  @apply !bg-yellowLight;
  @apply !bg-gradient-to-br from-pink via-yellowLight to-greenLight;
}
</style>
