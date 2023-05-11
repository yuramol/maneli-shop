/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://strapi.maneli.softbee.io/graphql',
    NEXTAUTH_URL: 'https://strapi.maneli.softbee.io/graphql/api/auth',
    NEXTAUTH_SECRET: 'Wq+i1/gD+i1LjQG20a8XgHOZSBSsJXsJ52DSFymliD8=',
  },
};

module.exports = nextConfig;
