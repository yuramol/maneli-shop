import { ProductEntity } from '@/__generated__/types';
import { ProductQuery } from '@/graphql/queries/__generated__/product';

export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  product?: ProductEntity | null;
  handleAddReviews?: (id: string) => void;
};
