import { BaseSyntheticEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/legacy/image';

import { ChangeImage } from './components/ChangeImage';

import { useUploadFileQuery } from '@/graphql/queries/__generated__/uploadFile';
import { useRemoveFileMutation } from '@/graphql/mutations/__generated__/removeFile';
import { useUploadMutation } from '@/graphql/mutations/__generated__/upload';
import { UploadFileEntity } from '@/__generated__/types';
import { ProductsDocument } from '@/graphql/queries/__generated__/products';

type Props = {
  currentImageID?: string | null;
  handleSetUploadImageId: (id?: string | null) => void;
};

export const AddEditImage: FC<Props> = ({ currentImageID = '', handleSetUploadImageId }) => {
  const { data } = useUploadFileQuery({
    variables: {
      id: currentImageID as string,
    },
  });

  const [uploadMutation] = useUploadMutation();
  const [removeFileMutation] = useRemoveFileMutation();

  const [localUploadImg, setLocalUploadImg] = useState<UploadFileEntity | undefined>(undefined);

  useEffect(() => {
    setLocalUploadImg(data?.uploadFile?.data as UploadFileEntity);
  }, [data]);

  const handleUploadImg = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];

    if (file) {
      try {
        if (localUploadImg?.id) {
          removeFileMutation({ variables: { id: localUploadImg?.id } }).then(() => {
            uploadMutation({ variables: { file } }).then(({ data }) => {
              handleSetUploadImageId(data?.upload.data?.id);
              setLocalUploadImg(data?.upload.data as UploadFileEntity);
            });
          });
        } else {
          uploadMutation({ variables: { file } }).then(({ data }) => {
            handleSetUploadImageId(data?.upload.data?.id);
            setLocalUploadImg(data?.upload.data as UploadFileEntity);
          });
        }
      } catch (err: unknown) {
        console.log('err===', err);
      }
    }
  };

  const handleDeleteImg = (id: string) => {
    removeFileMutation({ variables: { id } }).then(() => {
      handleSetUploadImageId(undefined);
      setLocalUploadImg(undefined);
    });
  };

  return (
    <div className="relative flex w-full h-full">
      {localUploadImg?.attributes?.url ? (
        <Image
          src={process.env.BASE_URL + localUploadImg.attributes.url}
          alt="Фото продукту"
          objectFit="cover"
          width={198}
          height={198}
        />
      ) : (
        <span className="m-auto">Додайте фото</span>
      )}
      <ChangeImage
        imageId={localUploadImg?.id as string}
        handleUploadImg={handleUploadImg}
        handleDeleteImg={handleDeleteImg}
      />
    </div>
  );
};
