<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="py-5 md:py-10">Account Settings</h1>
    <card>
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-greenDark">
          Update account email
        </h3>
        <div class="mt-2 max-w-xl text-sm text-greenDark">
          <p>Change the email address used to login to your account.</p>
        </div>
        <form
          class="mt-5 sm:flex sm:items-center"
          @submit.prevent.stop="updateEmail($refs.emailInput.value)"
        >
          <div class="w-full sm:max-w-xs">
            <label for="email" class="sr-only">Email</label>
            <input
              type="email"
              name="email"
              ref="emailInput"
              id="email"
              class="block w-full rounded-sm border-greenDark/20 bg-transparent text-greenDark focus:border-2 focus:border-green focus:ring-0 sm:text-sm"
              :value="user.email"
            />
          </div>
          <button
            type="submit"
            class="mt-3 inline-flex w-full items-center justify-center rounded-sm bg-green px-4 py-2 font-medium text-white hover:bg-greenDark sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home-layout',
})

const { $getUser, $updateUser } = useNuxtApp()
const user = await $getUser()

const updateEmail = async (newEmail: string) => {
  if (user != null) await $updateUser(user.userId, { email: newEmail })
}
</script>
