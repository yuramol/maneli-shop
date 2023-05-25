export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
};

export enum AddProductFields {
  Title = 'title',
  Description = 'description',
  Price = 'price',
  Discount = 'discount',
  Rating = 'rating',
  ImagePreview = 'imagePreview',
}
