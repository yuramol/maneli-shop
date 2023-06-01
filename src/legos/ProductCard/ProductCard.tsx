import { FC } from 'react';
import { CardBody, CardImage } from './layout';
import { ProductEntity } from '@/__generated__/types';

interface Props {
  product: ProductEntity;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const { id, attributes } = product;
  return (
    <div className="max-w-[373px]  flex flex-col pt-4 pb-8 sm:py-10">
      <CardImage
        id={id}
        image={attributes?.imagePreview?.data?.attributes?.url}
        discount={attributes?.discount}
      />
      <CardBody
        productId={id}
        title={attributes?.title}
        price={attributes?.price}
        discount={attributes?.discount}
      />
    </div>
  );
};
