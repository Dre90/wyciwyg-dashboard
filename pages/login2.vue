<template>
  <div class="container">
    <main>
      <h1>Welcome back</h1>
      <span>Sign in to your account</span>
      <form @submit.prevent="handleLogin" class="register">
        <label for="email">Email</label>
        <input v-model="email" type="email" placeholder="Email" name="email" />
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <input type="submit" value="Login" />
      </form>
    </main>
    <aside>
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

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 100vh;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  h1 {
    font-size: 2em;
  }
  border-right: 2px solid $dark-gray-plus1;
}

form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input[type="email"],
  input[type="password"] {
    background: $dark-gray-plus2;
    margin-bottom: 40px;
    padding: 10px;

    &::placeholder {
      color: #aaaaaa;
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
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 700;
    text-align: center;
    padding: 15px 0;
    width: 100%;
    color: $text-color-dark;

    &:focus,
    &:hover {
      background-color: $bv-dark-orange;
      border: 2px solid $bv-dark-orange;
    }

    &:active {
      background-color: $bv-text-color-dark;
      color: $bv-orange;
      border: 2px solid $bv-orange;
    }
  }
}

aside {
  .image-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
}
</style>
