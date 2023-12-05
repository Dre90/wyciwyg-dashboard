<template>
  <h1 class="mb-8 text-center text-6xl text-bv-green">{{ text }}</h1>
</template>

<script setup>
const { text } = defineProps(["text"]);
</script>
