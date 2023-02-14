<template>
  <NuxtLink to="/challenges">Back</NuxtLink>
  <div>challengesID: {{ id }}</div>
</template>

<script setup>
const { id } = useRoute().params;

definePageMeta({
  middleware: "auth",
});
</script>
