<template>
  <div class="sidebar">
    <img
      src="@/assets/images/logo.svg"
      alt="WYCIWYG - What you code is what you get"
    />
    <nav>
      <ul>
        <li><NuxtLink to="/">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/challenges">Challenges</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  padding: 25px;

  img {
    margin-bottom: 30px;
  }

  a {
    font-size: 2em;
  }
}
</style>
