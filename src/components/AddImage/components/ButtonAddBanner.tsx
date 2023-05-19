/* eslint-disable no-console */
import React, { BaseSyntheticEvent, FC, useEffect, useRef, useState } from 'react';

import { Button } from '@/legos';
import Image from 'next/image';
import loader from '../../../assets/Rolling.svg';

interface Props {
  loadingSrc?: File;
  handleUploadImg: () => void;
}
export const ButtonAddBanner: FC<Props> = ({ loadingSrc, handleUploadImg }) => {
  const inputRef = useRef(null);
  const imageRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (imageRef?.current && loadingSrc) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        imageRef.current.src = reader.result;
      });
      reader.readAsDataURL(loadingSrc);
      return () =>
        reader.removeEventListener('load', function () {
          console.log('removeEventListener');
        });
    }
  }, [loadingSrc]);

  return (
    <div class="flex items-center justify-center w-full">
      {loadingSrc ? (
        <div className="relative">
          <Image
            className="absolute"
            src={loader}
            alt="Loader"
            width={40}
            height={40}
            style={{ display: 'block', top: 'calc(50% - 20px)', left: 'calc(50% - 20px)' }}
          />
          <Image
            className="w-[198px] h-[198px]"
            ref={imageRef}
            src={''}
            alt="Placeholder"
            style={{
              display: loadingSrc ? 'unset' : 'none',
              opacity: 0.5,
              objectFit: 'fill',
              objectPosition: 'bottom',
            }}
          />
        </div>
      ) : (
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-full border-2 border-[#7613B5] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <button
              className="rounded-full border border-[#7613B5] text-base font-semibold py-4 px-6"
              onClick={handleClick}
            >
              + Зображення
            </button>
          </div>
          <input
            ref={inputRef}
            id="dropzone-file"
            type="file"
            class="hidden"
            onChange={handleUploadImg}
          />
        </label>
      )}
    </div>
  );
};
