<template>
  <div class="flex">
    <div class="item">Dashboard</div>
    <div class="item">Dashboard</div>
    <div class="item">Dashboard</div>
    <div class="item">Dashboard</div>
    <div class="item">Dashboard</div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<!-- <style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 20px 20px 20px 30px;
}

.item {
  background-color: $dark-gray-plus1;
  padding: 20px;
  height: 250px;
  width: 400px;
}
</style> -->
