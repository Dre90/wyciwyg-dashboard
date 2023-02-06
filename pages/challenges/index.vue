<template>
  <div>
    <h1>challenges</h1>
    <div v-if="challengesCount === 0">
      Create your first challenge here. Button
      <!-- TODO: -->
    </div>
    <div v-else>
      <ul>
        <li
          v-for="challenge in challenges"
          :key="challenge.id"
          :challenge-id="challenge.id"
        >
          {{ challenge.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const challengesCount = ref(0);

const { data: challenges } = await useAsyncData("challenges", async () => {
  const { data, error, status, count } = await client
    .from("Challenges")
    .select("id, name", { count: "estimated" })
    .eq("author_id", user.value.id)
    .order("created_at");

  // TODO: error handling

  challengesCount.value = count;
  if (data && status === 200) return data;
});
</script>

<style lang="scss" scoped></style>
