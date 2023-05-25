export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
};

export enum OrderUserFields {
  Quantity = 'quantity',
  Name = 'name',
  Phone = 'phone',
  Color = 'color',
  Model = 'model',
}
