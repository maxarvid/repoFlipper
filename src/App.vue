<script setup lang="ts">
import { useGithubStore } from './stores/github.store.ts';
import { storeToRefs } from 'pinia'
import FlipperForm from './components/FlipperForm.vue';
import FlipperTable from './components/FlipperTable.vue';
import DisplayPublicRepoCount from './components/DisplayPublicRepoCount.vue';

const store = useGithubStore();
const { authenticated } = storeToRefs(store);
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Github Repo Flipper"></v-app-bar>
    <v-main>
      <div v-if="!authenticated">
        <FlipperForm />
      </div>
      <div v-else>
        <DisplayPublicRepoCount />
        <FlipperTable />
      </div>
    </v-main>
  </v-layout>
</template>