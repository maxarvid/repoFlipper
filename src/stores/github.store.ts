import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Octokit } from 'octokit';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

type ReposListForUserResponseData =
  RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'];

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

  async function getRepos() {
    const octokit = new Octokit({ auth: token.value });
    const per_page = 100;
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const { data } = await octokit.rest.repos.listForAuthenticatedUser({
          per_page,
          page,
          affiliation: 'owner',
        });

        if (data.length < per_page) {
          hasNextPage = false;
        }
        repos.value = [...repos.value, ...data];
        page++;
      } catch (error) {
        throw new Error("Couldn't get repos");
      }
    }
    return repos.value;
  }

  async function flipReposToPrivate(repos: string[]) {
    const octokit = new Octokit({ auth: token.value });

    for (let repo of repos) {
      try {
        const { data } = await octokit.rest.repos.update({
          owner: username.value,
          repo,
          private: true,
        });
        console.log(data);
      } catch (error) {
        throw new Error("Couldn't update repo");
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
    getRepos,
    flipReposToPrivate,
  };
});
