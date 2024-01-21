import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Octokit } from 'octokit';

export const useAuthStore = defineStore('auth', () => {
  const username = ref('');
  const token = ref('');
  const publicRepoCount = ref(0);
  const authenticated = ref(false);

  async function authenticate() {
    const octokit = new Octokit({ auth: token.value });
    const { data } = await octokit.rest.users.getAuthenticated();
    publicRepoCount.value = data.public_repos;
    authenticated.value = true;
  }

  async function checkToken() {
    const octokit = new Octokit({ auth: token.value });
    const { data } = await octokit.rest.users.getAuthenticated();
    console.log(data);
  }

  return { username, token, authenticate, authenticated, publicRepoCount, checkToken };
});
