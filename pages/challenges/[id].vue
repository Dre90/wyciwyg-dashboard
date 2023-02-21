<template>
  <div>
    <div class="mb-6 w-full">
      <NuxtLink to="/challenges" class="">Back</NuxtLink>
    </div>

    <div v-if="isLoading">
      <p class="text-4xl text-bv-green">Loading..</p>
    </div>
    <div v-else-if="errorObj">
      <p>Something wrong happen when trying to load this challenge.</p>
    </div>

    <div v-else class="flex w-full gap-10">
      <div class="flex w-1/4 flex-col gap-12">
        <img
          :src="challenge.image_url"
          alt="The challenge reference image"
          class=""
        />
        <div class="flex flex-col items-center">
          <span class="text-8xl text-bv-green">{{ challenge.game_pin }}</span>
          <p class="text-xl">Game pin</p>
        </div>
        <div class="flex flex-col gap-6">
          <NuxtLink
            :to="`lobby/${challenge.id}`"
            class="inline-flex w-full cursor-pointer items-center justify-center border-2 border-bv-orange bg-bv-orange p-4 text-lg text-bv-text-color-dark transition-all hover:bg-bv-dark-orange focus:bg-bv-dark-orange active:bg-bv-text-color-dark active:fill-bv-orange active:text-bv-orange"
          >
            Start
          </NuxtLink>
          <NuxtLink
            :to="`results/${challenge.id}`"
            class="inline-flex w-full cursor-pointer items-center justify-center border-2 border-bv-orange bg-bv-orange p-4 text-lg text-bv-text-color-dark transition-all hover:bg-bv-dark-orange focus:bg-bv-dark-orange active:bg-bv-text-color-dark active:fill-bv-orange active:text-bv-orange"
          >
            Result
          </NuxtLink>
          <NuxtLink
            :to="`podium/${challenge.id}`"
            class="inline-flex w-full cursor-pointer items-center justify-center border-2 border-bv-orange bg-bv-orange p-4 text-lg text-bv-text-color-dark transition-all hover:bg-bv-dark-orange focus:bg-bv-dark-orange active:bg-bv-text-color-dark active:fill-bv-orange active:text-bv-orange"
          >
            Podium
          </NuxtLink>
          <NuxtLink
            :to="`votes/${challenge.id}`"
            class="inline-flex w-full cursor-pointer items-center justify-center border-2 border-bv-orange bg-bv-orange p-4 text-lg text-bv-text-color-dark transition-all hover:bg-bv-dark-orange focus:bg-bv-dark-orange active:bg-bv-text-color-dark active:fill-bv-orange active:text-bv-orange"
          >
            All votes
          </NuxtLink>
        </div>
      </div>
      <div class="">
        <h1 class="mb-6 text-7xl">{{ challenge.name }}</h1>
        <p class="whitespace-pre-line">{{ challenge.instructions }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const challenge = ref(null);
const errorObj = ref(null);
const isLoading = ref(true);

async function getChallenge() {
  const { data, error } = await supabase
    .from("Challenges")
    .select("id, name, instructions, image_url, game_pin")
    .eq("author_id", user.value.id)
    .eq("id", id)
    .single();

  if (data || error) isLoading.value = false;

  if (error) errorObj.value = error;

  if (data) challenge.value = data;
}

onBeforeMount(async () => {
  getChallenge();
});

definePageMeta({
  middleware: "auth",
});
</script>
