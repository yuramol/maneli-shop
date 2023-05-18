// eslint-disable-next-line no-undef
module.exports = {
  schema: 'https://strapi.maneli.softbee.io/graphql',
  documents: ['**/*.{graphql,js,ts,jsx,tsx}'],
  client: {
    service: {
      name: 'maneli-shop',
      url: 'https://strapi.maneli.softbee.io/graphql',
    },
  },
};
