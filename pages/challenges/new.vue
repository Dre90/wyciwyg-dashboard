<template>
  <div>
    <Back link="/challenges" />
    <div>
      <form
        class="mx-auto flex max-w-xl flex-col gap-4"
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
        <fieldset class="flex flex-col gap-1">
          <label for="refImage">Image assets</label>
          <p class="text-sm">
            Upload images that are needed for the design. After uploading a
            image copy the url past it into our instructions so the participants
            can use them.
          </p>

          <label class="orangeButton" for="imageAssets">
            {{ uploading ? "Uploading ..." : "Upload" }}
          </label>
          <input
            type="file"
            name="imageAssets"
            id="imageAssets"
            accept="image/*"
            class="hidden"
            multiple
          />
          <div class="my-4 grid grid-cols-2 gap-4">
            <div class="w-full">
              <img
                src="https://vdyttrpqmskpstvuntgk.supabase.co/storage/v1/object/public/public/reference/0.5617510124622584.jpg"
                alt=""
                class="h-auto w-full"
              />
              <div class="mt-4 flex gap-4">
                <button class="orangeButton">Copy URL</button>
                <button class="orangeButton">Delete</button>
              </div>
            </div>
            <div class="w-full">
              <img
                src="https://vdyttrpqmskpstvuntgk.supabase.co/storage/v1/object/public/public/reference/0.5617510124622584.jpg"
                alt=""
                class="h-auto w-full"
              />
              <div class="mt-4 flex gap-4">
                <button class="orangeButton">Copy URL</button>
                <button class="orangeButton">Delete</button>
              </div>
            </div>
            <div class="w-full">
              <img
                src="https://vdyttrpqmskpstvuntgk.supabase.co/storage/v1/object/public/public/reference/0.5617510124622584.jpg"
                alt=""
                class="h-auto w-full"
              />
              <div class="mt-4 flex gap-4">
                <button class="orangeButton">Copy URL</button>
                <button class="orangeButton">Delete</button>
              </div>
            </div>
            <div class="w-full">
              <img
                src="https://vdyttrpqmskpstvuntgk.supabase.co/storage/v1/object/public/public/reference/0.5617510124622584.jpg"
                alt=""
                class="h-auto w-full"
              />
              <div class="mt-4 flex gap-4">
                <button class="orangeButton">Copy URL</button>
                <button class="orangeButton">Delete</button>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="mt-6">
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
const uploading = ref<boolean>(false);
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

const RetrievePublicURL = async (FilePath: string) => {
  const { data } = supabase.storage.from("public").getPublicUrl(FilePath);
  return data.publicUrl;
};

const createChallenge = async (event: any) => {
  saving.value = true;

  await uploadReferenceImage(event.target.refImage.files);
  ReferenceImagePublicURL.value = await RetrievePublicURL(
    ReferenceImageFilePath.value,
  );

  try {
    const challenge = {
      name: name.value,
      instructions: instructions.value,
      game_pin: gamePin.value,
      author_id: author_id.value,
      image_url: ReferenceImagePublicURL.value,
      reference_image_file_path: ReferenceImageFilePath.value,
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

const copyContent = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

useHead({
  title: "Create new challenge | WYCIWYG",
});
</script>
