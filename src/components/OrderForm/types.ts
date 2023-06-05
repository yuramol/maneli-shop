export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  productId: string;
  productData: any;
};

export enum OrderUserFields {
  Quantity = 'quantity',
  Name = 'name',
  Phone = 'phone',
  Model = 'model',
  Color = 'color',
}
