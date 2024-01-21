<script setup lang="ts">
import { useGithubStore } from '../stores/github.store.ts';
import { storeToRefs } from 'pinia'

const store = useGithubStore();
const { publicRepoCount } = storeToRefs(store);
</script>


<template>
    <p>There are {{ publicRepoCount }} public repos associated with this token</p>
</template>


<style scoped></style>../stores/github.store.ts