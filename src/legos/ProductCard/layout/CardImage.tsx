import { StaticImageData } from 'next/image';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { DiscountLabel } from '@/legos/DiscountLabel';

export const CardImage = ({
  image,
  discount,
}: {
  image: StaticImageData;
  discount: number;
}) => (
  <Link href="#">
    <div
      className="relative w-full min-w-96 h-[373px] bg-white"
      style={{ margin: '0 auto', borderRadius: '15px' }}
    >
      <div className="absolute right-6 top-6 z-10">
        <DiscountLabel discount={discount} />
      </div>
      <Image
        src={image}
        alt={'preview-photo'}
        objectFit="contain"
        layout="fill"
        style={{ borderRadius: '15px' }}
      />
    </div>
  </Link>
);
