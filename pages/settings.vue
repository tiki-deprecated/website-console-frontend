<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="mb-10">Profile Settings</h1>
    <card>
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-bold leading-6 text-black-xlight">
          Update account email
        </h3>
        <div class="mt-2 max-w-xl text-sm text-black-xlight">
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
              class="block w-full rounded-md border-black-xlight bg-transparent text-black-light focus:border-2 focus:border-green focus:ring-0 sm:text-sm"
              :value="user.email"
            />
          </div>
          <button
            type="submit"
            class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-yellow-dark hover:shadow-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import { Profile } from '~/plugins/account'

definePageMeta({ layout: 'home-layout' })
const profile: Profile = useNuxtApp().$profile()

const user = await profile.getUser()

const updateEmail = async (newEmail: string) => {
  await profile.updateUser(user.userId, { email: newEmail })
}
</script>
