<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useGithubStore } from '../stores/github.store';
import { storeToRefs } from 'pinia'

type Item = {
    name: string,
    visibility?: string,
    url: string,
    fork?: boolean,

}

const headers = ref([
    { title: 'Name', value: 'name' },
    { title: 'Visibility', value: 'visibility' },
    { title: 'URL', value: 'url' },
    { title: 'Fork', value: 'fork' },
    { value: 'actions', sortable: false },
])
const loading = ref(true)
const items: Ref<Item[]> = ref([]);
const selected = ref([])
const search = ref('')
const store = useGithubStore();
const { getRepos } = store;
const { repos } = storeToRefs(store);
console.log(repos.value);

onMounted(async () => {
    await getRepos();
    items.value = repos.value.map((repo) => {
        return {
            name: repo.name,
            visibility: repo.visibility,
            url: repo.html_url,
            fork: repo.fork
        }
    })
    loading.value = false;
})
</script>

<template>
    <v-card title="Do you want  a title?">
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
            variant="outlined" hide-details></v-text-field>
        <v-data-table :loading="loading" v-model="selected" show-select :headers="headers"
            :items="items" :search="search" item-value="name">
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small @click="console.log(`I was clicked for ${item}`)">mdi-pencil</v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>
