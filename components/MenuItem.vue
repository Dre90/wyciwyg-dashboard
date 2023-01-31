<template>
  <li class="mb-4">
    <NuxtLink
      :to="`${link}`"
      class="text-2xl hover:border-b-2 hover:border-bv-green"
      ><slot
    /></NuxtLink>
  </li>
</template>

<script setup>
const { link } = defineProps(["link"]);
</script>
