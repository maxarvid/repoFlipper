<script setup lang="ts">
import { useGithubStore } from '../stores/github.store';
import { onMounted } from 'vue';
const store = useGithubStore();
const { getRepos, flipReposToPrivate } = store;

onMounted(() => {
    getRepos();
})

</script>
<template>
    <button type="button" @click="flipReposToPrivate">Change Repos to Private?</button>
</template>


<style scoped></style>