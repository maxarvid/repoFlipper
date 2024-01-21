<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store.ts';

const store = useAuthStore();
const { checkToken } = store;

const handleClick = async () => {
    await checkToken();
}


</script>


<template>
    <button @click="handleClick">Check your token</button>
</template>


<style scoped></style>