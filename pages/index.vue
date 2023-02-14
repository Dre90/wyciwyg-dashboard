<template>
  <div class="m-5 grid grid-cols-12 gap-8">
    <div class="col-start-1 col-end-3 h-60 bg-dark-gray-plus1 p-5">
      Dashboard
    </div>
    <div class="col-start-3 col-end-10 h-60 bg-dark-gray-plus1 p-5">
      Dashboard
    </div>
    <div class="col-start-10 col-end-13 h-60 bg-dark-gray-plus1 p-5">
      Dashboard
    </div>
    <div class="col-start-1 col-end-13 h-60 bg-dark-gray-plus1 p-5">
      Dashboard
    </div>

    <div class="col-start-1 col-end-13 h-60 bg-dark-gray-plus1 p-5">
      Dashboard
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Dashboard | WYCIWYG",
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
