<template>
  <div>
    <Back :link="`/challenges/${id}`" />

    <div>
      <div class="flex flex-col items-center">
        <span v-if="!gamePin" class="text-9xl text-bv-green">000000</span>
        <span class="text-9xl text-bv-green">{{ gamePin }}</span>
        <p class="mb-10 text-xl">Game pin</p>

        <img
          src="@/assets/images/QR.jpg"
          alt="QR code for voting"
          class="mb-10 w-1/2"
        />

        <h1 class="text-9xl text-bv-green">wyciwyg.dev/vote</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const gamePin = ref(null);

async function getChallenges() {
  const { data } = await supabase
    .from("Challenges")
    .select("game_pin")
    .eq("author_id", user.value.id)
    .eq("id", id)
    .single();

  if (data) gamePin.value = data.game_pin;
}

onBeforeMount(async () => {
  getChallenges();
});

definePageMeta({
  middleware: "auth",
});
</script>
