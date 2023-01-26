<template>
  <div class="flex flex-1 min-h-full">
    <main
      class="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg bg-scale-200 border-scale-500"
    >
      <div class="flex-1 flex flex-col justify-center w-[384px]">
        <div class="mb-10">
          <h1 class="mt-8 mb-2 text-2xl lg:text-3xl">Welcome back</h1>
          <span class="text-sm">Sign in to your account</span>
        </div>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            name="email"
            class="text-sm"
          />
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="********"
            name="password"
            class="text-sm"
          />
          <input type="submit" value="Login" class="text-xl" />
        </form>
      </div>
    </main>
    <aside
      class="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex"
    >
      <div class="image-container">
        <img src="../assets/images/logo.svg" alt="" />
      </div>
    </aside>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "empty",
});

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  console.log("Login");
};
</script>

<!-- <style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 500px 1fr;
  height: 100vh;
}

main {
  align-items: center;
  border-right: 2px solid $dark-gray-plus1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;

  .wrapper {
    width: 100%;
    max-width: 348px;
  }
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  label {
    margin-bottom: 5px;
  }

  input[type="email"],
  input[type="password"] {
    background: $dark-gray-plus2;
    margin-bottom: 40px;
    padding: 10px;

    &::placeholder {
      color: #626262;
    }

    &:focus {
      border: 2px solid $bv-blue;
      padding: 8px;
    }
  }

  input[type="submit"] {
    align-self: end;
    background-color: $bv-orange;
    border: 2px solid $bv-orange;
    color: $text-color-dark;
    cursor: pointer;
    font-weight: 700;
    padding: 15px 0;
    text-align: center;
    width: 100%;

    &:focus,
    &:hover {
      background-color: $bv-dark-orange;
      border: 2px solid $bv-dark-orange;
    }

    &:active {
      background-color: $bv-text-color-dark;
      border: 2px solid $bv-orange;
      color: $bv-orange;
    }
  }
}

aside {
  .image-container {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
  }
}
</style> -->
