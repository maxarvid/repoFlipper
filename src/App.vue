<script setup lang="ts">
import { ref } from 'vue';

const flippingTime = ref(false)

import FlipperButton from './components/FlipperButton.vue';
import FlipperForm from './components/FlipperForm.vue';

const hello = import.meta.env.VITE_TEST

console.log(hello)
</script>

<template>
  <div>
    <p>Github Repo Visibility Flipper</p>
    <FlipperButton v-if="!flippingTime" @set-flipping-time="flippingTime = !flippingTime" />
    <FlipperForm v-else />
  </div>
</template>

<style scoped></style>
