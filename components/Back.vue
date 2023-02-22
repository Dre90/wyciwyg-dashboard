<template>
  <div class="mb-6 w-full">
    <NuxtLink
      :to="`${link}`"
      class="border-b-2 border-bv-dark-gray text-xl hover:border-bv-orange"
      >Back</NuxtLink
    >
  </div>
</template>

<script setup>
const { link } = defineProps(["link"]);
</script>
