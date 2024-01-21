<script setup lang="ts">
import { ref } from 'vue';
// TODO: check out octokit/core probably enough
import { Octokit } from 'octokit';

const handleSubmit = async () => {
    const octokit = new Octokit({ auth: token.value });
    const { data } = await octokit.rest.repos.listForUser({ username: username.value })
    console.log(data);
}

const username = ref('')
const token = ref('')
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