import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY;
const owner = repository?.split('/')[0];
const repositoryName = repository?.split('/')[1];
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && owner && repositoryName;
const isUserSite = repositoryName === `${owner}.github.io`;

export default defineConfig({
	site: isGitHubPagesBuild ? `https://${owner}.github.io` : undefined,
	base: isGitHubPagesBuild && !isUserSite ? `/${repositoryName}` : '/',
});
