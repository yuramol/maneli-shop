import { ProductEntity } from '@/__generated__/types';
import { ProductQuery } from '@/graphql/queries/__generated__/product';

export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  product?: ProductEntity | null;
};

export enum AddProductFields {
  Title = 'title',
  Description = 'description',
  Price = 'price',
  PriceOld = 'priceOld',
  Discount = 'discount',
  Rating = 'rating',
  ImagePreview = 'imagePreview',
}
