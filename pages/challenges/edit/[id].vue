<template>
  <div>ChallengeID = {{ id }}</div>
</template>

<script setup>
const { id } = useRoute().params;
</script>
