import { FC } from 'react';
import Image from 'next/legacy/image';
import { StaticImageData } from 'next/image';

type Props = {
  title: string;
  text: string;
  src: StaticImageData;
};

export const ProductOptionCard: FC<Props> = ({ title, text, src }) => {
  return (
    <article className="flex flex-col rounded-2xl bg-[#F4F3FD]">
      <div className="mb-auto p-4 md:p-8">
        <h3 className="font-bold text-xl md:text-3xl">{title}</h3>
        <p className="text-sm md:text-lg mt-1 md:mt-2">{text}</p>
      </div>
      <Image src={src} alt="Product photo" />
    </article>
  );
};
