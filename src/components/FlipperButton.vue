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
    <v-sheet>
        <v-btn @click="flipReposToPrivate">Change Repos to
            Private?</v-btn>
    </v-sheet>
</template>


<style scoped></style>