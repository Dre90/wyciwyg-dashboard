<template>
  <aside class="flex min-h-full w-80 flex-col bg-dark-gray-plus1 p-5">
    <img
      src="@/assets/images/logo.svg"
      alt="WYCIWYG - What you code is what you get"
      class="mb-8"
    />

    <Menu />

    <div class="mt-auto">
      <button class="button block" @click="signOut">Sign Out</button>
    </div>
  </aside>
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
