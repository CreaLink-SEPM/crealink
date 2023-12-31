/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const nextConfig = {
    basePath,
  async redirects() {
    return [
      {
        source: '/',
        destination: `${basePath}/home`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
