<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="flex min-h-full flex-col pt-16 pb-12">
    <main
      class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8"
    >
      <div class="flex flex-shrink-0 justify-center">
        <a href="/" class="inline-flex">
          <span class="sr-only">TIKI</span>
          <img
            class="h-20 w-auto"
            sizes="(max-width: 317px) 100vw, 317px"
            srcset="
              ~/assets/images/png/pineapple-sad-w-200.png 200w,
              ~/assets/images/png/pineapple-sad-w-317.png 317w
            "
            src="~/assets/images/png/pineapple-sad-w-317.png"
            alt="Sad Pineapple"
          />
        </a>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p class="text-base font-semibold text-green">
            {{ error.statusCode }}
          </p>
          <h1
            class="mt-2 text-4xl font-bold tracking-tight text-green-dark sm:text-5xl"
          >
            {{ error.statusMessage }}
          </h1>
          <div class="mt-6">
            <nuxt-link
              to="/"
              class="text-base font-medium text-green hover:text-yellow-dark"
            >
              Go back to Console
              <span aria-hidden="true"> &rarr;</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </main>
    <footer class="mx-auto w-full max-w-7xl flex-shrink-0 px-6 lg:px-8">
      <nav class="flex justify-center space-x-4">
        <a
          href="https://discord.gg/tiki"
          class="text-sm font-normal text-green-dark hover:text-yellow-dark"
          >Discord</a
        >
        <span
          class="inline-block border-l border-green-light"
          aria-hidden="true"
        />
        <a
          href="https://twitter.com/my_tiki_"
          class="text-sm font-normal text-green-dark hover:text-yellow-dark"
          >Twitter</a
        >
        <span
          class="inline-block border-l border-green-light"
          aria-hidden="true"
        />
        <a
          href="https://status.mytiki.com"
          class="text-sm font-normal text-green-dark hover:text-yellow-dark"
          >Status</a
        >
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
})

const status = computed(() =>
  props.error.statusCode == null ? 'Error' : props.error.statusCode
)
</script>

<style lang="postcss">
html,
body,
div#__nuxt {
  @apply h-full;
}
</style>
