<template>
  <div class="flex flex-1 min-h-full">
    <main
      class="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r border-zinc-700"
    >
      <div class="flex-1 flex flex-col justify-center w-[384px]">
        <div class="mb-10">
          <h1 class="mt-8 mb-2 text-2xl lg:text-3xl">Welcome back</h1>
          <span class="text-sm">Sign in to your account</span>
        </div>
        <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
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
          <input
            type="submit"
            value="Login"
            class="text-xl bg-bv-orange p-4 text-bv-text-color-dark font-bold cursor-pointer hover:bg-bv-dark-orange active:bg-bv-dark-orange focus:bg-bv-dark-orange"
          />
        </form>
        <div class="self-center my-8 text-sm">
          <div>
            <span class="text-gray-400">Don't have an account?</span>
            <NuxtLink
              to="/sign-up"
              class="underline transition text-scale-1200 hover:text-gray-300"
            >
              Sign Up Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
    <aside
      class="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex"
    >
      <div class="opacity-60">
        <nuxt-img
          src="/images/logo.svg"
          alt="WYCIWYG - What you code is what you get"
        />
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

form {
  

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
