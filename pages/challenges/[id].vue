<template>
  <div>
    <div class="mb-6 w-full">
      <NuxtLink to="/challenges" class="">Back</NuxtLink>
    </div>

    <div class="flex w-full gap-10">
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
const client = useSupabaseClient();
const user = useSupabaseUser();
const challenge = ref({});

const { data, error } = await client
  .from("Challenges")
  .select("id, name, instructions, image_url, game_pin")
  .eq("author_id", user.value.id)
  .eq("id", id)
  .single();

// TODO: error handling
if (error) console.log(error.message);

if (data) challenge.value = data;

definePageMeta({
  middleware: "auth",
});
</script>
