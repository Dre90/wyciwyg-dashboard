<template>
  <div class="container">
    <Sidebar />
    <div class="content-container">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: 350px 1fr;
}

.content-container {
}
</style>
