<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="flex min-h-full flex-col bg-white pt-16 pb-12">
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
              ~/assets/images/png/sad_pineapple_w_200.png 200w,
              ~/assets/images/png/sad_pineapple_w_317.png 317w
            "
            src="~/assets/images/png/sad_pineapple_w_317.png"
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
            class="mt-2 text-4xl font-bold tracking-tight text-greenDark sm:text-5xl"
          >
            {{ error.statusMessage }}
          </h1>
          <div class="mt-6">
            <nuxt-link
              to="/"
              class="text-base font-medium text-green hover:text-yellowDark"
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
          class="text-sm font-normal text-greenDark hover:text-yellowDark"
          >Discord</a
        >
        <span
          class="inline-block border-l border-greenLight"
          aria-hidden="true"
        />
        <a
          href="https://twitter.com/my_tiki_"
          class="text-sm font-normal text-greenDark hover:text-yellowDark"
          >Twitter</a
        >
        <span
          class="inline-block border-l border-greenLight"
          aria-hidden="true"
        />
        <a
          href="https://status.mytiki.com"
          class="text-sm font-normal text-greenDark hover:text-yellowDark"
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

<!--<style scoped>-->
<!--body-->
<!--  margin: 0-->
<!--  font-family: $font-family-space-grotesk-->
<!--  font-weight: normal-->
<!--  font-size: 90%-->
<!--  background-color: $gray-->

<!--.container-->
<!--  position: absolute-->
<!--  top: 50%-->
<!--  left: 50%-->
<!--  transform: translate(-50%, -50%)-->
<!--  width: fit-content-->

<!--.text-->
<!--  font-family: $font-family-koara-->
<!--  font-weight: bold-->
<!--  color: $blue-->
<!--  width: fit-content-->
<!--  margin: 0 auto 10px auto-->

<!--.image-->
<!--  width: 50px-->
<!--  margin: auto-->
<!--  display: block-->
<!--</style>-->
