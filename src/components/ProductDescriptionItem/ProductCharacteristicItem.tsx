import { FC } from 'react';
import Image from 'next/legacy/image';
import { StaticImageData } from 'next/image';

type Props = {
  title: string;
  text?: string;
};

export const ProductCharacteristicItem: FC<Props> = ({ title, text }) => {
  return (
    <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
      <dt className="font-semibold">
        {title}
        {text ? `:` : ''}
      </dt>
      {text && <dd>text</dd>}
    </span>
  );
};
