<template>
  <div>
    <div v-if="challengesCount === 0">
      Create your first challenge here. Button
      <!-- TODO: -->
    </div>
    <div v-else>
      <ul class="flex flex-col gap-2">
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
            <div class="flex h-20">
              <img
                :src="challenge.image_url"
                alt="Thumbnail of the challenge reference image"
                class=""
              />
              <div class="ml-6 self-center text-2xl">
                {{ challenge.name }}
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const challengesCount = ref(0);
const challenges = ref([]);

const { data, error, count } = await client
  .from("Challenges")
  .select("id, name, image_url", { count: "estimated" })
  .eq("author_id", user.value.id)
  .order("created_at");

// TODO: error handling
if (error) console.log(error.message);

challengesCount.value = count;
if (data) challenges.value = data;

definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Challenges | WYCIWYG",
});
</script>

<style lang="scss" scoped></style>
