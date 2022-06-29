/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    GITHUB_REPO_URL: process.env.GITHUB_REPO_URL,
  },
};

module.exports = nextConfig;
