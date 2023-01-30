<template>
  <div class="flex min-h-full w-80 flex-col bg-dark-gray-plus1 p-5">
    <img
      src="@/assets/images/logo.svg"
      alt="WYCIWYG - What you code is what you get"
      class="mb-8"
    />

    <Menu />

    <div class="mt-auto">
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
