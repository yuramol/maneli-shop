import { mutationName, typeDefs } from './typeDefs';
import { resolversConfig } from './resolversConfig';
import { createOrderResolver } from './createOrderResolver';

export const createOrder = () => ({
  typeDefs,
  resolversConfig,
  resolvers: {
    Mutation: {
      [mutationName]: {
        resolve: createOrderResolver,
      },
    },
  },
});
