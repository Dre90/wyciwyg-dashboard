<template>
  <div>
    <div class="mb-6 w-full">
      <NuxtLink :to="`/challenges/${id}`" class="">Back</NuxtLink>
    </div>
    <div>
      <img
        :src="referenceImage"
        alt="The challenge reference image"
        class="max-w-5xl"
      />
    </div>

    <div class="mb-28 grid grid-cols-2 justify-center gap-10">
      <div v-for="result in challengeResults" :key="result.id">
        <h2 class="text-4xl text-bv-green">{{ result.id }}</h2>
        <div class="relative h-96 w-auto overflow-hidden bg-white">
          <iframe
            :srcdoc="result.value"
            class="absolute top-0 left-0 h-96 w-auto"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const referenceImage = ref("");
const challengeResults = ref([]);

async function getChallengeData(id) {
  const { data, error } = await supabase
    .from("Challenges")
    .select("image_url")
    .eq("author_id", user.value.id)
    .eq("id", id)
    .single();

  // TODO: error handling
  if (error) console.log(error.message);

  if (data) referenceImage.value = data.image_url;
}

async function getChallengeResults(id) {
  try {
    let { data, error, status } = await supabase
      .from("Results")
      .select("*")
      .eq("challenge_id", id);

    if (error && status !== 406) throw error;

    if (data && status === 200) {
      challengeResults.value = data;
    }
  } catch (error) {
    alert(error.message);
  }
}

onMounted(async () => {
  getChallengeData(id);
  getChallengeResults(id);
});

definePageMeta({
  middleware: "auth",
});
</script>
