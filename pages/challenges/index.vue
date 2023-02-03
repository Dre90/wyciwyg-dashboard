<template>
  <div>
    <h1>challenges</h1>
    <ul>
      <li
        v-for="challenge in activeChallenges"
        :key="challenge.id"
        :challenge-id="challenge.id"
      >
        {{ challenge.name }}
      </li>
    </ul>
    <ul>
      <li
        v-for="challenge in inactiveChallenges"
        :key="challenge.id"
        :challenge-id="challenge.id"
      >
        {{ challenge.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const activeChallenges = ref([]);
const inactiveChallenges = ref([]);

async function getChallenges(active) {
  const activeState = ref("");

  if (active === true) {
    activeState.value = true;
  } else {
    activeState.value = false;
  }

  try {
    let { data, error, status } = await client
      .from("Challenges")
      .select("id, name")
      .is("active", activeState.value)
      .eq("author_id", user.value.id);

    if (error && status !== 406) throw error;

    if (data && status === 200) {
      return data;
    }
  } catch (error) {
    alert(error.message);
  }
}

onMounted(() => {
  activeChallenges.value = getChallenges(true);
  inactiveChallenges.value = getChallenges(false);
});
</script>

<style lang="scss" scoped></style>
