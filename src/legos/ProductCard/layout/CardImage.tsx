import { FC } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { DiscountLabel } from '@/legos/DiscountLabel';
import { Maybe } from '@/__generated__/types';

type Props = {
  id?: Maybe<string>;
  image?: string;
  discount?: Maybe<number>;
};

export const CardImage: FC<Props> = ({ id, image, discount }) => (
  <Link href={`product/${id}`}>
    <div
      className="relative w-full  h-[156px] sm:h-[373px] bg-white"
      style={{ margin: '0 auto', borderRadius: '15px' }}
    >
      {!!discount && <DiscountLabel discount={discount} />}
      {image && (
        <Image
          src={(process.env.BASE_URL + image) as string}
          alt={'preview-photo'}
          objectFit="contain"
          layout="fill"
          style={{ borderRadius: '15px' }}
          priority
        />
      )}
    </div>
  </Link>
);
