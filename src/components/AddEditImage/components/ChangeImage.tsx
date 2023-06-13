import { BaseSyntheticEvent, FC, useRef } from 'react';
import { IconButton } from '@/legos';

interface Props {
  imageId: string;
  handleUploadImg: (evt: BaseSyntheticEvent<object, any, any>) => Promise<void>;
  handleDeleteImg: (id: string) => void;
}

export const ChangeImage: FC<Props> = ({ imageId, handleUploadImg, handleDeleteImg }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  return (
    <div
      className="absolute flex flex-col top-0 left-0 w-full h-full justify-center content-center bg-black
          transition-opacity duration-500 linear opacity-0 hover:opacity-70"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-3">
        <button
          type="button"
          className="rounded-full border border-[#FFFFFF] text-white font-semibold py-4 px-6"
          onClick={handleClick}
        >
          {imageId ? 'Змінити' : '+ Додати'}
        </button>
        {imageId && (
          <IconButton
            icon="Delete"
            className="border border-white p-4 rounded-full text-white transition-all duration-150 hover:text-red-500 hover:border-red-500"
            onClick={() => handleDeleteImg(imageId)}
          />
        )}
      </div>
      <input ref={inputRef} type="file" className="hidden" onChange={handleUploadImg} />
    </div>
  );
};
