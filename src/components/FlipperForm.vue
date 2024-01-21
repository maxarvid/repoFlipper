<script setup lang="ts">
import { ref } from 'vue';

const username = ref('')
const token = ref('')


</script>

<template>
    <form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username" />
        <label for="token">Token</label>
        <input type="password" id="token" name="token" v-model="token" />
        <button type="submit">Submit</button>
    </form>
</template>


<style scoped></style>