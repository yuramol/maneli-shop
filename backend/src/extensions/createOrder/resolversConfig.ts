import { mutationName } from './typeDefs';

export const resolversConfig = {
  [`Mutation.${mutationName}`]: {
    auth: false,
  },
};
