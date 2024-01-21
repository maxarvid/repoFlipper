<script setup lang="ts">
import { useGithubStore } from './stores/github.store.ts';
import { storeToRefs } from 'pinia'
import FlipperForm from './components/FlipperForm.vue';
import FlipperButton from './components/FlipperButton.vue';
import DisplayPublicRepoCount from './components/DisplayPublicRepoCount.vue';

const store = useGithubStore();
const { authenticated } = storeToRefs(store);
</script>

<template>
  <div>
    <p>Github Repo Visibility Flipper</p>
    <div v-if="!authenticated">
      <FlipperForm />
    </div>
    <div v-else>
      <DisplayPublicRepoCount />
      <FlipperButton />
    </div>
  </div>
</template>

<style scoped></style>