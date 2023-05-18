/* eslint-disable no-console */
import React, { BaseSyntheticEvent, FC, useState } from 'react';

import { Button } from '@/legos';
import { validateImg } from '../helper';

interface Props {
  openModalInfo(img: HTMLImageElement): void;
  variantBanner: Enum_Banner_Size;
}
export const ButtonAddBanner: FC<Props> = ({ openModalInfo, variantBanner }) => {
  const [loadImage, setLoadImage] = useState(false);
  // const [uploadImageFileMutation, { loading: uploadFile }] = useUploadImageFileMutation();
  // const [createImageBannerMutation] = useCreateImageBannerMutation();

  const handleUploadImg = async (evt: BaseSyntheticEvent) => {
    setLoadImage(true);
    const file = evt.target.files[0];
    if (file) {
      try {
        const imgObj = await validateImg(file, variantBanner);
        if (imgObj.isValid) {
          // await handleSaveImageBannerToBack(file);
        } else {
          openModalInfo(imgObj.img);
        }
      } catch (err: unknown) {
        console.log('err===', err);
      } finally {
        setLoadImage(false);
      }
    }
  };

  const handleSaveImageBannerToBack = async (file: File) => {
    try {
      // const response = await uploadImageFileMutation({
      //   variables: {
      //     file: file,
      //   },
      // });
      // if (response && response.data?.upload.data?.id) {
      //   await createImageBannerMutation({
      //     variables: {
      //       data: { image: response.data.upload.data.id, size: variantBanner },
      //       locale: updateSelectLanguage,
      //     },
      //     refetchQueries: [
      //       {
      //         query: GetBannersDocument,
      //         variables: VariablesGetBanners(selectLanguages, variantBanner),
      //       },
      //     ],
      //   });
      // }
    } catch (err: unknown) {
      console.log('err===', err);
    }
  };

  return (
    <div className="w-[290px]">
      <Button width="290px">
        {(!uploadFile || !loadImage) && (
          <>
            + Add Image
            <input
              style={{
                position: 'absolute',
                opacity: 0,
                cursor: 'pointer',
                width: '100%',
                height: '100%',
              }}
              type="file"
              onChange={handleUploadImg}
            />
          </>
        )}
      </Button>
    </div>
  );
};
