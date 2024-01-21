import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Octokit } from 'octokit';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

type ReposListForUserResponseData =
  RestEndpointMethodTypes['repos']['listForUser']['response']['data'];

export const useGithubStore = defineStore('github', () => {
  const username = ref('');
  const token = ref('');
  const repos: Ref<ReposListForUserResponseData> = ref([]);
  const publicRepoCount = ref(0);
  const authenticated = ref(false);

  async function authenticate() {
    const octokit = new Octokit({ auth: token.value });
    try {
      const { data } = await octokit.rest.users.getAuthenticated();
      publicRepoCount.value = data.public_repos;
      authenticated.value = true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async function checkToken() {
    const octokit = new Octokit({ auth: token.value });
    const { data } = await octokit.rest.users.getAuthenticated();
    console.log(data);
  }
  async function getRepos() {
    const octokit = new Octokit({ auth: token.value });
    const per_page = 100;
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const { data } = await octokit.rest.repos.listForUser({
        username: username.value,
        per_page,
        page,
      });

      if (data.length < per_page) {
        hasNextPage = false;
      }
      repos.value = [...repos.value, ...data];
      page++;
    }
    return repos.value;
  }

  async function flipReposToPrivate() {
    const octokit = new Octokit({ auth: token.value });

    for (let repo of repos.value) {
      try {
        const { data } = await octokit.rest.repos.update({
          owner: username.value,
          repo: repo.name,
          private: true,
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return {
    username,
    token,
    repos,
    publicRepoCount,
    authenticated,
    authenticate,
    checkToken,
    getRepos,
    flipReposToPrivate,
  };
});
