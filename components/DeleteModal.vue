<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="isOpen = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-dark-gray-plus2 text-left font-JetBrainsMono shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-dark-gray-plus2 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <ExclamationTriangleIcon
                      class="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-xl font-semibold leading-6 text-bv-text-color"
                      >Delete challenge</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-bv-text-color">
                        Are you sure you want to delete this challenge?<br />
                        All of the data connected to this challenge will be
                        permanently removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-dark-gray-plus3 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="deleteEverything(challengeID)"
                >
                  <svg
                    v-if="deleting"
                    class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ deleteButtontext }}
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="setIsOpen(false)"
                  ref="cancelButtonRef"
                  :disabled="deleting"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
const supabase = useSupabaseClient();

const isOpen = ref<boolean>(false);
const deleting = ref<boolean>(false);

const { challengeID } = defineProps(["challengeID"]);

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
};
const deleteEverything = async (id: string) => {
  deleting.value = true;
  try {
    await deleteAssets(id);
    await deleteVotes(id);
    await deleteStats(id);
    await deleteResults(id);
    await deleteReferenceImage(id);
    await deleteChallenge(id);
  } catch (error: any) {
    alert(error.message);
  } finally {
    deleting.value = false;
    setIsOpen(false);
    navigateTo("/challenges");
  }
};

const deleteAssets = async (id: string) => {
  const assetsArray = await getAssetsListByChallengeID(id);
  if (typeof assetsArray !== "undefined") {
    for (const asset of assetsArray) {
      try {
        const { data, error } = await supabase.storage
          .from("public")
          .remove([asset.file_path]);

        if (error) throw error;
      } catch (error: any) {
        alert(error.message);
      }
      try {
        const { error } = await supabase
          .from("Assets")
          .delete()
          .eq("id", asset.id);

        if (error) throw error;
      } catch (error: any) {
        alert(error.message);
      }
    }
  }
};

const deleteVotes = async (id: string) => {
  try {
    const { error } = await supabase
      .from("Vote")
      .delete()
      .eq("challenge_id", id);

    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  }
};

const deleteStats = async (id: string) => {
  try {
    const { error } = await supabase
      .from("Stats")
      .delete()
      .eq("challenge_id", id);

    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  }
};

const deleteResults = async (id: string) => {
  try {
    const { error } = await supabase
      .from("Results")
      .delete()
      .eq("challenge_id", id);

    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  }
};

const deleteChallenge = async (id: string) => {
  try {
    const { error } = await supabase.from("Challenges").delete().eq("id", id);

    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  }
};

const deleteReferenceImage = async (id: string) => {
  const referenceImageFilePath =
    await getReferenceImageFilePathFromChallenge(id);
  if (
    typeof referenceImageFilePath !== "undefined" &&
    referenceImageFilePath.length > 0
  ) {
    try {
      const { data, error } = await supabase.storage
        .from("public")
        .remove([referenceImageFilePath[0].reference_image_file_path]);

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  }
};

const getAssetsListByChallengeID = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Assets")
      .select("id, file_path, url")
      .eq("challenge_id", id);

    if (error) throw error;

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};

const getReferenceImageFilePathFromChallenge = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Challenges")
      .select("reference_image_file_path")
      .eq("id", id);

    if (error) throw error;

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};

const deleteButtontext = computed(() => {
  return deleting.value ? "Deleting" : "Delete";
});

defineExpose({
  setIsOpen,
});
</script>
