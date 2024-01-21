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
const dialog = ref(false)
const items: Ref<Item[]> = ref([]);
const selected: Ref<string[]> = ref([])
const search = ref('')
const store = useGithubStore();
const { getRepos, flipReposToPrivate } = store;
const { repos } = storeToRefs(store);

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

const handleUpdate = (item: Item) => {
    const isSelected = selected.value.some((selectedItem: string) => selectedItem === item.name);
    if (!isSelected) {
        selected.value.push(item.name);
    }
    dialog.value = true;
}

const handleUpdateAccept = async () => {
    loading.value = true;
    try {
        await flipReposToPrivate(selected.value);
        selected.value = [];
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
    dialog.value = false;
}
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
                <v-icon small @click="handleUpdate(item)">mdi-pencil</v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-card-text>
                    These are the repos you selected to make private:
                    <v-list :items="selected"></v-list>
                    This action is irreversible. Are you sure you want to continue?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="primary" @click="handleUpdateAccept">Continue</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
