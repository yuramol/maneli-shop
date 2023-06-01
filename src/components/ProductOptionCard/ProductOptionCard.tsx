import { FC } from 'react';
import Image from 'next/legacy/image';
import { UploadFile } from '@/__generated__/types';

type Props = {
  title: string;
  text: string;
  image?: UploadFile;
};

export const ProductOptionCard: FC<Props> = ({ title, text, image }) => {
  return (
    <article className="flex flex-col w-full rounded-2xl bg-[#F4F3FD]">
      <div className="mb-auto p-4 md:p-8">
        <h3 className="font-bold text-xl md:text-3xl">{title}</h3>
        <p className="text-sm md:text-lg mt-1 md:mt-2">{text}</p>
      </div>
      {image && (
        <Image
          src={process.env.BASE_API_URL + image.url}
          alt="Product photo"
          width={image.width as number}
          height={image.height as number}
        />
      )}
    </article>
  );
};
