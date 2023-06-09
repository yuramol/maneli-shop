import { FC } from 'react';
import { CardBody, CardImage } from './layout';
import { ProductEntity } from '@/__generated__/types';

interface Props {
  product: ProductEntity;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const { id, attributes } = product;
  return (
    <div className="flex flex-col h-full w-full pt-4 pb-8 sm:py-10">
      <CardImage
        id={id}
        image={attributes?.imagePreview?.data?.attributes?.url}
        discount={attributes?.discount}
      />
      <CardBody
        productId={id}
        title={attributes?.title}
        priceOld={attributes?.priceOld as number}
        price={attributes?.price as number}
      />
    </div>
  );
};
