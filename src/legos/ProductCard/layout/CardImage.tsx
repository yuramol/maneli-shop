import { DiscountLabel } from '@/legos/DiscountLabel';
import { StaticImageData } from 'next/image';
import Image from 'next/legacy/image';
import { useLayoutEffect, useState } from 'react';

export const CardImage = ({
  image,
  discount,
}: {
  image: StaticImageData;
  discount: number;
}) => {
  const [xsScreen, setXsScreen] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setXsScreen(window.innerWidth > 640);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <div className="relative w-full min-w-96 h-96">
      <div className="absolute right-6 top-6 z-10">
        <DiscountLabel discount={discount} />
      </div>
      <Image
        src={image}
        alt={'preview-photo'}
        objectFit="cover"
        style={{ borderRadius: '15px', width: '100%' }}
      ></Image>
    </div>
  );
};
