/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GITHUB_REPO_URL: process.env.GITHUB_REPO_URL
  }
}

module.exports = nextConfig
