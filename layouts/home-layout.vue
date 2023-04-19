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
                      class="h-8 w-8 text-black"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4 py-2">
                  <a href="https://mytiki.com"
                    ><img
                      class="h-12 w-auto"
                      sizes="(max-width: 576px) 100vw, 576px"
                      srcset="
                        ~/assets/images/png/pineapple-jump-w-200.png 200w,
                        ~/assets/images/png/pineapple-jump-w-576.png 576w
                      "
                      src="~/assets/images/png/pineapple-jump-w-576.png"
                      alt="TIKI"
                  /></a>
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <nuxt-link
                    v-for="item in pages"
                    :key="item.name"
                    :to="item.href"
                    @click="setActive(item.name)"
                    :class="{
                      'text-black-light': item.current,
                      'font-bold': item.current,
                      'text-black-xlight': !item.current,
                      'hover:text-black-light': !item.current,
                      'bg-yellow-xxlight': item.current,
                    }"
                    class="group flex items-center rounded-md px-2 py-2 text-sm"
                  >
                    <component
                      :is="item.icon"
                      :class="{
                        'fill-black-light': item.current,
                        'fill-black-xlight': !item.current,
                        'hover:fill-black-light': !item.current,
                      }"
                      class="mr-3 h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </nuxt-link>
                  <div class="pt-4">
                    <a
                      v-for="item in links"
                      :key="item.name"
                      :href="item.href"
                      class="group flex items-center rounded-md px-2 py-2 text-sm text-black-xlight hover:text-black-light"
                    >
                      <component
                        :is="item.icon"
                        class="mr-3 h-5 w-6 flex-shrink-0 fill-black-xlight group-hover:text-black-light"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </a>
                  </div>
                </nav>
              </div>
              <div class="flex flex-row-reverse justify-evenly px-2 py-4">
                <button
                  v-for="item in actions"
                  :key="item.name"
                  @click.stop.prevent="item.onClick"
                  class="group flex items-center rounded-md px-2 py-2 text-sm text-pinkDark hover:text-purple"
                >
                  <component
                    :is="item.icon"
                    class="mr-3 h-5 w-6 flex-shrink-0 fill-pinkDark group-hover:fill-purple"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0"></div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-56 md:flex-col">
      <div class="flex min-h-0 flex-1 flex-col bg-white">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4 py-4">
            <a href="https://mytiki.com"
              ><img
                class="h-12 w-auto"
                sizes="(max-width: 576px) 100vw, 576px"
                srcset="
                  ~/assets/images/png/pineapple-jump-w-200.png 200w,
                  ~/assets/images/png/pineapple-jump-w-576.png 576w
                "
                src="~/assets/images/png/pineapple-jump-w-576.png"
                alt="TIKI"
              />
            </a>
          </div>
          <nav class="mt-5 flex-1 space-y-1 bg-transparent px-2">
            <nuxt-link
              v-for="item in pages"
              @click="setActive(item.name)"
              :key="item.name"
              :to="item.href"
              :class="{
                'hover:text-black-light': !item.current,
                'text-black-xlight': !item.current,
                'text-black-light': item.current,
                'font-bold': item.current,
                'bg-yellow-xxlight': item.current,
              }"
              class="group flex items-center rounded-md px-2 py-2 text-sm"
            >
              <component
                :is="item.icon"
                :class="{
                  'group-hover:fill-black-light': !item.current,
                  'fill-black-light': item.current,
                  'fill-black-xlight': !item.current,
                }"
                class="mr-3 h-6 w-6 flex-shrink-0"
                aria-hidden="true"
              />
              {{ item.name }}
            </nuxt-link>
            <div class="pt-10">
              <a
                v-for="item in links"
                target="_blank"
                :key="item.name"
                :href="item.href"
                class="group flex items-center rounded-md px-2 py-2 text-sm text-black-xlight hover:text-black-light"
              >
                <component
                  :is="item.icon"
                  class="mr-3 h-5 w-6 flex-shrink-0 fill-black-xlight group-hover:fill-black-light"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </div>
          </nav>
        </div>
        <div class="px-2 py-4">
          <button
            v-for="item in actions"
            :key="item.name"
            @click.stop.prevent="item.onClick"
            class="group flex items-center rounded-md px-2 py-2 text-sm text-pinkDark hover:text-purple"
          >
            <component
              :is="item.icon"
              class="mr-3 h-5 w-6 flex-shrink-0 text-pinkDark group-hover:fill-purple"
              aria-hidden="true"
            />
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-56">
      <div
        class="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden"
      >
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-black"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-10 w-10" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="mx-10 my-16 md:my-20">
          <slot />
        </div>
      </main>
    </div>
    <modal v-if="showHelpModal" @close="onCloseHelpModal">
      <div class="mt-6 grid place-content-center text-green-dark">
        <img
          class="mx-auto h-20 w-auto"
          sizes="(max-width: 276px) 100vw, 276px"
          srcset="
            ~/assets/images/png/pineapple-hand-w-200.png 200w,
            ~/assets/images/png/pineapple-hand-w-276.png 276w
          "
          src="~/assets/images/png/pineapple-hand-w-276.png"
          alt=""
        />
        <h3 class="mx-auto mt-6 text-center">
          No worries,<br />we're here to help.
        </h3>
        <ul class="mx-6 mx-auto mt-4 list-disc text-xs">
          <li class="mt-2">
            To get technical help or an answer to a question, pop in our discord
            —the whole team's there.
          </li>
          <li class="mt-2">
            To report a bug or request a feature, simply open an issue (or
            better yet, a PR) on GitHub.
          </li>
        </ul>
        <div class="mt-10 flex items-center justify-evenly">
          <a
            href="https://discord.gg/tiki"
            class="flex items-center rounded-sm bg-[#7289DA] py-2 px-4 text-white hover:bg-[#7289DA]/75"
          >
            Discord <discord-icon class="ml-2 h-6" />
          </a>
          <a
            href="https://github.com/tiki"
            class="flex items-center rounded-sm bg-[#24292F] py-2 px-4 text-white hover:bg-[#24292F]/75"
          >
            GitHub <git-hub-icon class="ml-2 h-6" />
          </a>
        </div>
      </div>
    </modal>
  </div>
</template>

<script setup lang="ts">
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
  CommandLineIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
} from '@heroicons/vue/24/solid'
import { XCircleIcon } from '@heroicons/vue/24/outline'

import DiscordIcon from '~/assets/images/svg/discord.svg'
import GitHubIcon from '~/assets/images/svg/github.svg'
import ReadmeIcon from '~/assets/images/svg/readme.svg'
import CatIcon from '~/assets/images/svg/cat.svg'

const auth = useNuxtApp().$auth()
const showHelpModal = ref(false)
const onLogout = async () => {
  await auth.logout()
  window.location.href = 'https://mytiki.com'
}

const path = useRoute().path as string

const pages = ref([
  {
    name: 'Projects',
    href: '/',
    icon: SquaresPlusIcon,
    current: path.startsWith('/project'),
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: CurrencyDollarIcon,
    current: path.startsWith('/billing'),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog8ToothIcon,
    current: path.startsWith('/settings'),
  },
])

const links = [
  { name: 'Docs', href: 'https://mytiki.com/docs', icon: ReadmeIcon },
  {
    name: 'API',
    href: 'https://mytiki.com/docs',
    icon: CommandLineIcon,
  },
  {
    name: 'Changelog',
    href: 'https://mytiki.com/changelog',
    icon: MegaphoneIcon,
  },
  { name: 'Discord', href: 'https://discord.gg/tiki', icon: DiscordIcon },
  { name: 'GitHub', href: 'https://github.com/tiki', icon: GitHubIcon },
  { name: 'Status', href: 'https://status.mytiki.com', icon: CheckBadgeIcon },
]

const actions = [
  {
    name: 'Halp !!!',
    onClick: () => (showHelpModal.value = true),
    icon: CatIcon,
  },
  { name: 'Logout', onClick: onLogout, icon: ArrowLeftCircleIcon },
]

const sidebarOpen = ref(false)

const setActive = (name: string) => {
  pages.value.forEach((page) => {
    page.current = page.name === name
  })
}

const onCloseHelpModal = () => (showHelpModal.value = false)
</script>

<style lang="postcss">
html,
body,
div#__nuxt {
  @apply !h-fit min-h-full;
}
</style>
