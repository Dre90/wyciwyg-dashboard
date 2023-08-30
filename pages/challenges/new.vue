<template>
  <div>
    <Back link="/challenges" />
    <div>
      <form
        class="flex max-w-xl flex-col gap-4"
        @submit.prevent="createChallenge($event)"
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

        <fieldset class="flex flex-col gap-1">
          <label for="refImage">Reference image</label>
          <input
            type="file"
            name="refImage"
            accept="image/*"
            class="rounded-md text-sm"
          />
        </fieldset>
        <div>
          <input
            type="submit"
            class="orangeButton"
            :value="saving ? 'Saving ...' : 'Save'"
            :disabled="saving"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3
// https://supabase.com/docs/reference/javascript/storage-createbucket

import { customAlphabet } from "nanoid";
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);
const supabase = useSupabaseClient();

const user = useSupabaseUser();

const saving = ref<boolean>(false);
const files = ref();
const name = ref<string>();
const instructions = ref<string>();
const gamePin = ref<string>();
const author_id = ref<string>();
const ReferenceImageFilePath = ref<string>("");
const ReferenceImagePublicURL = ref<string>("");

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

const uploadReferenceImage = async (filesObject: object) => {
  files.value = filesObject;
  try {
    //uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `reference/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    ReferenceImageFilePath.value = filePath;
  } catch (error: any) {
    alert(error.message);
  } finally {
    //uploading.value = false
  }
};

const RetrievePublicURL = async () => {
  const { data } = supabase.storage
    .from("public")
    .getPublicUrl(ReferenceImageFilePath.value);

  ReferenceImagePublicURL.value = data.publicUrl;
};

const createChallenge = async (event: any) => {
  //console.log(event.target.refImage.files);

  await uploadReferenceImage(event.target.refImage.files);
  await RetrievePublicURL();

  try {
    saving.value = true;

    const challenge = {
      name: name.value,
      instructions: instructions.value,
      game_pin: gamePin.value,
      author_id: author_id.value,
      image_url: ReferenceImagePublicURL.value,
    };

    let { error } = await supabase.from("Challenges").insert(challenge, {
      returning: "minimal", // Don't return the value after inserting
    });
    if (error) throw error;
    navigateTo("/challenges");
  } catch (error: any) {
    alert(error.message);
  } finally {
    saving.value = false;
  }
};

useHead({
  title: "Create new challenge | WYCIWYG",
});
</script>
