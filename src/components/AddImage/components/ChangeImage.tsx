import { BaseSyntheticEvent, FC, useRef } from 'react';

interface Props {
  handleUploadImg: (evt: BaseSyntheticEvent<object, any, any>) => Promise<void>;
}

export const ChangeImage: FC<Props> = ({ handleUploadImg }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };
  
  return (
    <div
      className="absolute flex flex-col top-0 left-0 w-full h-full justify-center content-center bg-black
          transition-opacity duration-500 linear opacity-0 hover:opacity-50"
    >
      <div className="mt-3">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <button
            className="rounded-full border border-[#FFFFFF] text-white font-semibold py-4 px-6"
            onClick={handleClick}
          >
            + Змінити
          </button>
        </div>
        <input
          ref={inputRef}
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleUploadImg}
        />
      </div>
    </div>
  );
};