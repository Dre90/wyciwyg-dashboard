<template>
  <div>
    <div>
      <PageHeading text="Create challenge" />
      <form
        class="mx-auto flex max-w-2xl flex-col gap-8"
        @submit.prevent="createChallenge($event)"
      >
        <fieldset class="flex flex-col gap-1">
          <label for="name">Name</label>
          <input
            v-model="name"
            autofocus
            required
            type="text"
            placeholder=""
            name="name"
            class="form-input rounded-md text-sm text-bv-dark-gray"
          />
        </fieldset>

        <fieldset class="flex flex-col gap-1">
          <label for="refImage">Reference image</label>
          <input
            type="file"
            name="refImage"
            accept="image/*"
            class="rounded-md text-sm"
            required
          />
        </fieldset>

        <fieldset class="flex flex-col gap-1">
          <label for="instructions">Instructions</label>
          <textarea
            v-model="instructions"
            rows="16"
            name="instructions"
            class="form-textarea rounded-md text-sm text-bv-dark-gray"
            required
          />
        </fieldset>

        <fieldset class="flex flex-col gap-1">
          <label for="refImage">Image assets</label>
          <p class="text-sm">
            Upload images that are needed for the design. After uploading a
            image copy the url and past it into your instructions so the
            participants can use them.
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
            @change="uploadAssets"
            :disabled="uploading"
          />
          <div class="my-4 grid grid-cols-2 gap-4">
            <div v-for="asset in assetsArray" class="w-full">
              <NuxtImg :src="asset.URL" alt="" class="h-auto w-full" />
              <div class="mt-4 flex gap-4">
                <div @click="copyContent(asset.URL)" class="orangeButton">
                  Copy URL
                </div>
                <div @click="deleteFile(asset.FilePath)" class="orangeButton">
                  Delete
                </div>
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
import type { Database } from "@/types/database.types";
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
import type { AssetsArray } from "@/types/AssetsArray.type";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

// Refs
const saving = ref<boolean>(false);
const files = ref();
const uploading = ref<boolean>(false);
const name = ref<string>();
const instructions = ref<string>();
const gamePin = ref<string>();
const author_id = ref<string>();
const ReferenceImageFilePath = ref<string>("");
const ReferenceImagePublicURL = ref<string>("");
const assetsArray = ref<AssetsArray[]>([]);

const getAuthorId = async () => {
  author_id.value = user.value.id;
};

onMounted(async () => {
  getAuthorId();
  gamePin.value = createGamePin();
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

const uploadAssets = async (event: InputFileEvent) => {
  files.value = event.target.files;

  try {
    uploading.value = true;

    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    Array.from(files.value).forEach(async (file: any) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `assets/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("public")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const fileURL = await retrievePublicURL(filePath);

      assetsArray.value.push({
        FilePath: filePath,
        URL: fileURL,
      });
    });
  } catch (error: any) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

const retrievePublicURL = async (FilePath: string) => {
  const { data } = supabase.storage.from("public").getPublicUrl(FilePath);
  return data.publicUrl;
};

const deleteFile = async (FilePath: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("public")
      .remove([FilePath]);

    if (error) throw error;

    removeObjectFromArray(FilePath, assetsArray.value);
  } catch (error: any) {
    alert(error.message);
  }
};

const saveAssetsToDB = async (
  ChallengeID: number,
  assetsArray: AssetsArray[],
) => {
  for (const asset of assetsArray) {
    try {
      const { error } = await supabase.from("Assets").insert([
        {
          file_path: asset.FilePath,
          url: asset.URL,
          challenge_id: ChallengeID,
        },
      ]);
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  }
};

const createChallenge = async (event: any) => {
  saving.value = true;

  await uploadReferenceImage(event.target.refImage.files);
  ReferenceImagePublicURL.value = await retrievePublicURL(
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

    let { data, error } = await supabase
      .from("Challenges")
      .insert(challenge)
      .select("id");
    if (error) throw error;

    if (data) await saveAssetsToDB(data[0].id, assetsArray.value);

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
