import { StaticImageData } from 'next/image';
import { CardBody, CardImage } from './layout';
import { FC } from 'react';

interface Props {
  productInfo: {
    productId: number;
    price: number;
    discount: number;
    title: string;
    rate: number;
    image: StaticImageData;
  };
}

export const ProductCard: FC<Props> = ({ productInfo }) => {
  const { title, image, discount, price } = productInfo;
  return (
    <div className="max-w-[373px]  flex flex-col pt-4 pb-8 sm:py-10">
      <CardImage image={image} discount={discount} />
      <CardBody title={title} price={price} discount={discount} />
    </div>
  );
};
