<template>
  <div>
    <div v-if="isLoading">
      <p class="text-4xl text-bv-green">Loading..</p>
    </div>
    <div v-else-if="errorObj">
      <p>Something wrong happen when trying to load your challenges.</p>
    </div>
    <div v-else-if="!challenges.length" class="text-4xl text-bv-green">
      <p>You haven't created any challenges yet.</p>
      <p>
        Create your
        <NuxtLink to="/challenges/new" class="hover:bg-bv-green-hover-bg"
          >first challenge here.</NuxtLink
        >
      </p>
      <!-- TODO: -->
    </div>
    <div v-else>
      <PageHeading text="Challenges" />
      <ul class=": grid grid-cols-1 gap-8 lg:grid-cols-2">
        <li
          v-for="challenge in challenges"
          :key="challenge.id"
          :challenge-id="challenge.id"
          class="bg-dark-gray-plus1"
        >
          <NuxtLink
            :to="`/challenges/${challenge.id}`"
            class="block hover:bg-bv-green-hover-bg"
          >
            <div class="flex flex-row">
              <div class="flex h-48 w-1/2 items-center overflow-hidden">
                <NuxtImg
                  :src="challenge.image_url"
                  alt="Thumbnail of the challenge reference image"
                  class="overflow-hidden"
                />
              </div>
              <div class="w-1/2 px-4 py-4">
                <h2 class="text-2xl">
                  {{ challenge.name }}
                </h2>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const challenges = ref([]);
const errorObj = ref(null);
const isLoading = ref(true);

async function getChallenges() {
  const { data, error } = await supabase
    .from("Challenges")
    .select("id, name, image_url")
    .eq("author_id", user.value.id)
    .order("created_at", { ascending: false });

  if (data || error) isLoading.value = false;

  if (error) errorObj.value = error;

  if (data) challenges.value = data;
}

onMounted(async () => {
  getChallenges();
});

useHead({
  title: "Challenges | WYCIWYG",
});
</script>

<style lang="scss" scoped></style>
