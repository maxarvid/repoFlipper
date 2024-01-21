import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRepoStore = defineStore('repo', () => {
  const repos = ref([]);

async function getRepos() {
  // const octokit = new Octokit({ auth: token.value });
    // const { data } = await octokit.rest.repos.listForUser({ username: username.value, per_page: 50 })
    // console.log(data);
}

  return { repos, getRepos };
});
