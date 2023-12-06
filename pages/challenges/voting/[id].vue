<template>
  <div>
    <Back :link="`/challenges/${id}`" />

    <div v-if="isLoading">
      <p class="text-4xl text-bv-green">Loading..</p>
    </div>

    <div v-else class="flex flex-col items-center">
      <div v-html="QRCodeSVG" class="mb-14 w-1/2"></div>

      <span v-if="!gamePin" class="text-9xl text-bv-orange">000000</span>
      <span class="text-9xl text-bv-orange">{{ gamePin }}</span>
      <p class="mb-8 text-xl">Game pin</p>

      <h1 class="mb-10 text-9xl text-bv-green">wyciwyg.dev/vote</h1>
    </div>
  </div>
</template>

<script setup>
import QRCode from "qrcode";
const { id } = useRoute().params;
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const isLoading = ref(true);
const gamePin = ref(null);
const QRCodeSVG = ref(null);

async function getChallenges() {
  const { data } = await supabase
    .from("Challenges")
    .select("game_pin")
    .eq("author_id", user.value.id)
    .eq("id", id)
    .single();

  if (data) gamePin.value = data.game_pin;
}

const generateQRCodeSVG = async () => {
  const url = "https://wyciwyg.dev/vote/" + id;
  try {
    QRCodeSVG.value = await QRCode.toString(url);
    isLoading.value = false;
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  getChallenges();
  generateQRCodeSVG();
});
</script>
