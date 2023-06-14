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
  <div className="relative w-full pt-[100%] rounded-2xl" style={{ margin: '0 auto' }}>
    <Link href={`product/${id}`}>
      {!!discount && <DiscountLabel discount={discount} />}
      {image && (
        <Image
          src={(process.env.BASE_API_URL + image) as string}
          alt={'preview-photo'}
          objectFit="contain"
          layout="fill"
          priority
          style={{ borderRadius: '16px' }}
        />
      )}
    </Link>
  </div>
);
