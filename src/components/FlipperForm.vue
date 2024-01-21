<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store.ts';
import { storeToRefs } from 'pinia'

const store = useAuthStore();
const { token, username } = storeToRefs(store);
const { authenticate } = store;

const handleSubmit = async () => {
    await authenticate();
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