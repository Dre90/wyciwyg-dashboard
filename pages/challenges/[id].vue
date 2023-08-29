<template>
  <div>
    <Back link="/challenges" />

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
          <OrangeButtonLink
            :link="`lobby/${challenge.id}`"
            button-text="Start"
          />
          <OrangeButtonLink
            :link="`results/${challenge.id}`"
            button-text="Result"
          />
          <OrangeButtonLink
            :link="`voting/${challenge.id}`"
            button-text="Voting information"
          />
          <OrangeButtonLink
            :link="`podium/${challenge.id}`"
            button-text="Podium"
          />
          <OrangeButtonLink
            :link="`votes/${challenge.id}`"
            button-text="All votes"
          />
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

onMounted(async () => {
  getChallenge();
});
</script>
