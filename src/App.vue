<script setup lang="ts">
import { useAuthStore } from './stores/auth.store.ts';
import { storeToRefs } from 'pinia'
import FlipperForm from './components/FlipperForm.vue';
import CheckTokenButton from './components/CheckTokenButton.vue';

const hello = import.meta.env.VITE_TEST
const store = useAuthStore();
const { authenticated } = storeToRefs(store);
console.log(hello)
</script>

<template>
  <div>
    <p>Github Repo Visibility Flipper</p>
    <div v-if="!authenticated">
      <FlipperForm />
    </div>
    <CheckTokenButton />
  </div>
</template>

<style scoped></style>
