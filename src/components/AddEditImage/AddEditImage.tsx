import { BaseSyntheticEvent, FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';

import { ChangeImage } from './components/ChangeImage';
import { ButtonAddImage } from './components/ButtonAddImage';

import { useUploadFileQuery } from '@/graphql/queries/__generated__/uploadFile';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { useRemoveFileMutation } from '@/graphql/mutations/__generated__/removeFile';
import { useUploadMutation } from '@/graphql/mutations/__generated__/upload';

type Props = {
  currentImageID?: string;
  handleSetImagePreviewId?: (id?: string | null | undefined) => void;
};

export const AddEditImage: FC<Props> = ({ currentImageID = '', handleSetImagePreviewId }) => {
  const { query } = useRouter();
  const [loadingSrc, setLoadingSrc] = useState(undefined);

  const { data } = useUploadFileQuery({
    variables: {
      id: currentImageID,
    },
  });

  const [uploadMutation] = useUploadMutation();
  const [removeFileMutation] = useRemoveFileMutation();
  const [updateProductMutation] = useUpdateProductMutation();

  const uploadFile = data?.uploadFile?.data;

  const handleUploadImg = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];
    setLoadingSrc(file);

    if (file) {
      try {
        console.log('debug > handleClick===', file);

        if (uploadFile) {
          console.log('Remove and upload File!');

          removeFileMutation({ variables: { id: uploadFile.id as string } }).then(() => {
            uploadMutation({ variables: { file } }).then(({ data }) => {
              updateProductMutation({
                variables: {
                  id: query.id as string,
                  data: { imagePreview: data?.upload.data?.id },
                },
              });
            });
          });
        } else {
          console.log('Upload File!');

          uploadMutation({ variables: { file } }).then(({ data }) => {
            if (query.id) {
              updateProductMutation({
                variables: {
                  id: query.id as string,
                  data: { imagePreview: data?.upload.data?.id },
                },
              });
            } else {
              handleSetImagePreviewId(data?.upload.data?.id);
            }
          });
        }
      } catch (err: unknown) {
        console.log('err===', err);
      }
    }
  };

  return !loadingSrc ? (
    <div className="relative flex w-full h-full">
      {uploadFile?.attributes?.url ? (
        <Image
          src={process.env.BASE_URL + uploadFile?.attributes?.url}
          alt="Фото продукту"
          objectFit="cover"
          width={198}
          height={198}
        />
      ) : (
        <span className="m-auto">Додайте фото</span>
      )}
      <ChangeImage handleUploadImg={handleUploadImg} />
    </div>
  ) : (
    <ButtonAddImage loadingSrc={loadingSrc} handleUploadImg={handleUploadImg} />
  );
};
