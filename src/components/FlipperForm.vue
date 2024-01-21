<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store.ts';
import { storeToRefs } from 'pinia'
// TODO: check out octokit/core probably enough
import { Octokit } from 'octokit';

const store = useAuthStore();
const { token, username } = storeToRefs(store);

const handleSubmit = async () => {
    const octokit = new Octokit({ auth: token.value });
    const { data } = await octokit.rest.repos.listForUser({ username: username.value, per_page: 50 })
    console.log(data);
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username" />
        <label for="token">Token</label>
        <input type="password" id="token" name="token" v-model="token" />
        <button type="submit">Submit</button>
    </form>
</template>


<style scoped></style>