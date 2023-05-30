export const mutationName = 'createOrder';

export const typeDefs = `
  input CreateOrderInput {
    productId: ID!
    productModification: String!
    quantity: Int!
    userName: String!
    userPhone: String!
  }

  type CreateOrderResult {
    status: String
    message: String
  }

  type Mutation {
    ${mutationName}(data: CreateOrderInput!): CreateOrderResult
  }
`;
