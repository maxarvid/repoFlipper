<script setup lang="ts">
import { useGithubStore } from '../stores/github.store.ts';
import { storeToRefs } from 'pinia'

const store = useGithubStore();
const { publicRepoCount } = storeToRefs(store);
</script>


<template>
    <v-card class="mx-auto" variant="tonal" width="400px">
        <v-card-text>
            There are {{ publicRepoCount }} public repos associated with this token and user
        </v-card-text>
    </v-card>
</template>