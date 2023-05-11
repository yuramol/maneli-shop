/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://strapi.maneli.softbee.io/graphql',
    NEXTAUTH_URL: 'https://strapi.maneli.softbee.io/graphql/api/auth',
    // NEXTAUTH_SECRET: 'PBTheTgTo4z3mDg8gw6vhQbiRk3XhftpVEI7CaSG7XM=',
  },
};

module.exports = nextConfig;
