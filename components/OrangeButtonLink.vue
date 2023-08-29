<template>
  <NuxtLink
    :to="`${link}`"
    class="inline-flex w-full cursor-pointer items-center justify-center border-2 border-bv-orange bg-bv-orange p-4 text-lg text-bv-text-color-dark transition-all hover:bg-bv-dark-orange focus:bg-bv-dark-orange active:bg-bv-text-color-dark active:fill-bv-orange active:text-bv-orange"
  >
    {{ buttonText }}
  </NuxtLink>
</template>

<script setup lang="ts">
type PropsType = {
  link: String;
  buttonText: String;
};

const { link, buttonText } = defineProps<PropsType>();
</script>
