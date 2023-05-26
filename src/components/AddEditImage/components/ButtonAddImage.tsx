/* eslint-disable no-console */
import React, { BaseSyntheticEvent, FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChangeImage } from './ChangeImage';

interface Props {
  loadingSrc?: File;
  handleUploadImg: (evt: BaseSyntheticEvent<object, any, any>) => Promise<void>;
}
export const ButtonAddImage: FC<Props> = ({ loadingSrc, handleUploadImg }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef?.current && loadingSrc) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (imageRef.current !== null) {
          imageRef.current.src = reader.result as string;
        }
      });
      reader.readAsDataURL(loadingSrc);
      return () =>
        reader.removeEventListener('load', () => {
          console.log('removeEventListener');
        });
    }
  }, [loadingSrc]);

  return (
    <div className="relative flex w-full h-full">
      <Image
        ref={imageRef}
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDEwIDEwIj4KICA8Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iNSIgc3R5bGU9ImZpbGw6cmVkOyIgLz4KPC9zdmc+Cg=="
        alt="Placeholder"
        width={198}
        height={198}
        style={{ width: 'auto', height: 'auto', objectFit: 'cover' }}
      />
      <ChangeImage handleUploadImg={handleUploadImg} />
    </div>
  );
};
