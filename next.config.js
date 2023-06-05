/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://maneli-shop.netlify.app',
    BASE_API_URL: 'https://strapi.maneli.softbee.io',
    GRAPHQL_API: 'https://strapi.maneli.softbee.io/graphql/',
    NEXTAUTH_URL: 'https://maneli-shop.netlify.app/api/auth',
    NEXTAUTH_SECRET: 'Wq+i1/gD+i1LjQG20a8XgHOZSBSsJXsJ52DSFymliD8=',
  },
  images: {
    domains: ['strapi.maneli.softbee.io'],
  },
};

module.exports = nextConfig;
