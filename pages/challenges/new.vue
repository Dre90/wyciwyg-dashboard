<template>
  <div>
    <Back link="/challenges" />
    <div>
      <form
        class="flex max-w-xl flex-col gap-4"
        @submit.prevent="createChallenge"
      >
        <div class="flex flex-col gap-1">
          <label for="name">Name</label>
          <input
            v-model="name"
            autofocus
            type="text"
            placeholder=""
            name="name"
            class="text-sm text-bv-dark-gray"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="instructions">Instructions</label>
          <textarea
            v-model="instructions"
            rows="16"
            name="instructions"
            class="text-sm text-bv-dark-gray"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="refImage">Reference image</label>
          <input
            type="file"
            name="refImage"
            class="text-sm text-bv-dark-gray"
          />
        </div>

        <!-- <div class="flex flex-col gap-1">
          <label for="active">Active</label>
          <input
            v-model="active"
            type="checkbox"
            placeholder=""
            name="active"
            class="text-sm text-bv-dark-gray"
          />
        </div> -->
      </form>
    </div>
  </div>
</template>

<script setup>
// TODO: https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3
// https://supabase.com/docs/reference/javascript/storage-createbucket

import { customAlphabet } from "nanoid";
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);

const user = useSupabaseUser();

const name = ref("");
const instructions = ref("");
const gamePin = ref("");
const author_id = ref("");
/* const active = ref(false); */

const getAuthorId = async () => {
  author_id.value = user.value.id;
};

const createGamePin = async () => {
  gamePin.value = nanoid();
};

onMounted(async () => {
  getAuthorId();
  createGamePin();
});

const createChallenge = async () => {
  console.log("Login");
};

useHead({
  title: "Create new challenge | WYCIWYG",
});
</script>
