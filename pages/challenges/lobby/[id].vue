<template>
  <div>
    <div class="mb-6 w-full">
      <NuxtLink :to="`/challenges/${id}`" class="">Back</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;

definePageMeta({
  middleware: "auth",
});
</script>
