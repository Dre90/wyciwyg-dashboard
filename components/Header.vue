<template>
  <header class="flex h-24 w-full flex-row bg-dark-gray-plus1">
    <div class="p-3">
      <h1 class="text-center text-5xl text-bv-green">WYCIWYG</h1>
      <small class="">What you code is what you get</small>
    </div>

    <Menu />

    <div class="ml-auto">
      <button class="button block" @click="signOut">Sign Out</button>
    </div>
  </header>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseAuthClient();

async function signOut() {
  try {
    //loading.value = true;
    let { error } = await client.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    //loading.value = false;
  }
}

watchEffect(async () => {
  if (!user.value) await navigateTo({ path: "/sign-in", replace: true });
});
</script>
