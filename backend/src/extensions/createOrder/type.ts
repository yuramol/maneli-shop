export type CreateOrderMutationInput = {
  productId: string;
  productModification: string;
  quantity: number;
  userName: string;
  userPhone: string;
};

export type CreateOrderResolverArg = {
  data: CreateOrderMutationInput;
};
