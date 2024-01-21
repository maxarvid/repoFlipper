<script setup lang="ts">
import { ref } from 'vue';
import { useGithubStore } from '../stores/github.store.ts';
import { storeToRefs } from 'pinia'

const store = useGithubStore();
const { token, username } = storeToRefs(store);
const { authenticate } = store;

const usernameRules = ref([
    (value: string) => {
        if (value?.length > 0) return true
        return 'Username is required'
    }
])

const tokenRules = ref([
    (value: string) => {
        if (value?.length > 0) return true
        return 'Token is required'
    }
])

const handleSubmit = async () => {
    await authenticate();
}
</script>

<template>
    <v-sheet width="300" class="mx-auto">
        <v-form fast-fail @submit.prevent="handleSubmit">
            <v-text-field label="Username" type="text" id="username" name="username" v-model="username"
                :rules="usernameRules" />
            <v-text-field label="Token" type="password" id="token" name="token" v-model="token"
                :rules="tokenRules" />
            <v-btn :disabled="!username.length || !token.length" block class="mt-2"
                type="submit">Submit</v-btn>
        </v-form>
    </v-sheet>
</template>


<style scoped></style>../stores/github.store.ts