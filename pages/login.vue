<template>
  <div class="background">
    <div class="name-wrapper">
      <h1>Sign in</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div class="messages">
        <p>{{ errorMsg }}</p>
        <p v-if="showMsg">Check your email for the login link!</p>
      </div>
      <form v-on:submit.prevent="handleLogin" class="register">
        <input v-model="email" type="email" placeholder="Email" />
        <input
          type="submit"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "empty",
});

const supabase = useSupabaseClient();

const email = ref(null);
const loading = ref(false);
const errorMsg = ref(null);
const showMsg = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: { emailRedirectTo: "http://localhost:3000" },
    });
    if (error) throw error;
    if (!error) showMsg.value = true;
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.background {
  align-items: center;
  background-color: rgba(42, 42, 42, 0.9);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed; /* Stay in place */
  top: 0;
  width: 100vw;
  z-index: 1; /* Sit on top */
  position: relative;
}

.background:before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-image: url("../assets/images/logo.svg");
  background-repeat: no-repeat;
  background-position: 50% 25px;
  background-size: 1000px auto;
}

.name-wrapper {
  background-color: $bv-citrine-white;
  color: $bv-text-color-dark;
  padding: 80px 75px 40px 75px;
  position: relative;
}

h1 {
  color: #11133c;
  font-style: normal;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  margin-bottom: 15px;
}

.register {
  display: flex;
  flex-direction: column;

  input[type="email"],
  input[type="password"] {
    background: #ffffff;
    border: 1px solid $bv-blue;
    margin-bottom: 40px;
    padding: 10px;
    width: 600px;

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
    font-size: 20px;
    font-weight: 700;
    height: 50px;
    line-height: 26px;
    text-align: center;
    padding: 0 20px;

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
</style>
