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

    <div class="footer">
      <!-- <div>{{ sessionStore.session.user.email }}</div> -->
      <!-- {{ user.email }} -->
      <button class="button block" @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

async function signOut() {
  await navigateTo("/");
  /* try {
    //loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigateTo("/");
  } catch (error) {
    alert(error.message);
  } finally {
    //loading.value = false;
  } */
}
</script>

<!-- <style lang="scss" scoped>
.sidebar {
  height: 100vh;
  padding: 20px;
  background-color: $dark-gray-plus1;
  display: flex;
  flex-direction: column;

  img {
    margin-bottom: 30px;
  }

  a {
    font-size: 1.5rem;
  }

  .router-link-active {
    border-bottom: 2px solid $bv-green;
  }

  .footer {
    margin-top: auto;
  }
}
</style> -->
