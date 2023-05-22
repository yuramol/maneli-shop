import React, { BaseSyntheticEvent, FC, useRef } from 'react';
import Image from 'next/image';

import { Button } from '@/legos';
import productImage from '../../../assets/rectangle-25.png';
import { ChangeImage } from './ChangeImage';

interface Props {
  imgUrl?: string;
  handleUploadImg: (evt: BaseSyntheticEvent<object, any, any>) => Promise<void>;
}

export const BannerImage: FC<Props> = ({ imgUrl, handleUploadImg }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  return (
    <div className="relative flex w-full h-full">
      <Image
        src={productImage}
        alt="Product photo"
        width={198}
        height={254}
        style={{ margin: 'auto' }}
      />
      <ChangeImage handleUploadImg={handleUploadImg} />
    </div>
  );
};
