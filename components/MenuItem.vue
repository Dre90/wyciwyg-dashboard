<template>
  <li class="h-full">
    <NuxtLink
      :to="`${link}`"
      class="flex h-full items-center border-b-8 border-dark-gray-plus1 text-2xl hover:border-bv-green"
      ><slot
    /></NuxtLink>
  </li>
</template>

<script setup>
const { link } = defineProps(["link"]);
</script>
