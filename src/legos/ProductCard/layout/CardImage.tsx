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
      className="relative w-full  h-[156px] sm:h-[373px] bg-white"
      style={{ margin: '0 auto', borderRadius: '15px' }}
    >
      <div className="absolute right-2 sm:right-6 top-2 sm:top-6 z-10">
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
