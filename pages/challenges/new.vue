<template>
  <div>
    <Back link="/challenges" />
    <div>
      <form
        class="flex max-w-xl flex-col gap-4"
        @submit.prevent="createChallenge"
      >
        <fieldset class="flex flex-col gap-1">
          <label for="name">Name</label>
          <input
            v-model="name"
            autofocus
            type="text"
            placeholder=""
            name="name"
            class="rounded-md text-sm text-bv-dark-gray"
          />
        </fieldset>

        <fieldset class="flex flex-col gap-1">
          <label for="instructions">Instructions</label>
          <textarea
            v-model="instructions"
            rows="16"
            name="instructions"
            class="rounded-md text-sm text-bv-dark-gray"
          />
        </fieldset>

        <!-- <fieldset class="flex flex-col gap-1">
          <label for="refImage">Reference image</label>
          <input
            type="file"
            name="refImage"
            class="rounded-md text-sm text-bv-dark-gray"
          />
        </fieldset> -->
        <div>
          <input
            type="submit"
            class="orangeButton"
            :value="loading ? 'Loading ...' : 'Save'"
            :disabled="loading"
          />
        </div>
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
const supabase = useSupabaseClient();

const user = useSupabaseUser();

const loading = ref(false);
const name = ref("");
const instructions = ref("");
const gamePin = ref("");
const author_id = ref("");

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

async function createChallenge() {
  try {
    loading.value = true;

    const challenge = {
      name: name.value,
      instructions: instructions.value,
      game_pin: gamePin.value,
      author_id: author_id.value,
    };

    let { error } = await supabase.from("Challenges").insert(challenge, {
      returning: "minimal", // Don't return the value after inserting
    });
    if (error) throw error;
    navigateTo("/challenges");
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

useHead({
  title: "Create new challenge | WYCIWYG",
});
</script>
