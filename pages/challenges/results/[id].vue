<template>
  <div>
    <div class="mb-6 w-full">
      <NuxtLink :to="`/challenges/${id}`" class="">Back</NuxtLink>
    </div>
    <div class="mb-10 flex flex-row items-start justify-between">
      <div>
        <h2 class="text-2xl text-bv-green">Reference</h2>
        <img
          :src="referenceImage"
          alt="The challenge reference image"
          class="max-w-4xl"
        />
      </div>
      <button
        v-if="challengeResults.length"
        class="border-2 border-bv-blue bg-bv-blue p-4 text-bv-green hover:bg-bv-hover-blue active:bg-bv-green active:text-bv-blue"
        @click="showNameFunction"
      >
        Show names
      </button>
    </div>

    <div v-if="!challengeResults.length">
      <p class="text-6xl text-bv-green">
        There are no results yet on this challenge
      </p>
    </div>

    <div v-else class="mb-28 grid grid-cols-2 justify-center gap-10">
      <div v-for="result in challengeResults" :key="result.id">
        <h2 class="text-4xl text-bv-green">
          {{ result.id }}<span v-if="showName"> - {{ result.name }}</span>
        </h2>
        <div class="relative h-[700px] w-auto overflow-hidden bg-white">
          <iframe
            :srcdoc="result.value"
            class="absolute top-0 left-0 h-[1400px] w-[1600px] origin-top-left scale-50"
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
const showName = ref(false);

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

function showNameFunction() {
  showName.value = true;
}

onBeforeMount(async () => {
  getChallengeData(id);
  getChallengeResults(id);
});

definePageMeta({
  middleware: "auth",
});
</script>
