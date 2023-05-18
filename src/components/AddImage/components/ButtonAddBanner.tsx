/* eslint-disable no-console */
import React, { BaseSyntheticEvent, FC, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { TranslatedField } from '../../../components/Layout/components/TranslatedField/TranslatedField';
import { validateImg } from '../utils/constans';
import { useUploadImageFileMutation } from '../../../graphql/mutations/__generated__/uploadImageFile';
import { useCreateImageBannerMutation } from '../../../graphql/mutations/__generated__/createBanner';
import { GetBannersDocument } from '../../../graphql/queries/__generated__/getBanners';
import { VariablesGetBanners } from '../../../graphql/queries/hook/useGetBanners';
import { useLocalization } from '../../../localization';
import { Enum_Banner_Size } from '../../../__generated__/types';
import { handlerError } from '../../../helpers/functions';

interface Props {
  openModalInfo(img: HTMLImageElement): void;
  variantBanner: Enum_Banner_Size;
}
export const ButtonAddBanner: FC<Props> = ({ openModalInfo, variantBanner }) => {
  const { updateSelectLanguage, selectLanguages } = useLocalization();
  const [loadImage, setLoadImage] = useState(false);
  const [uploadImageFileMutation, { loading: uploadFile }] = useUploadImageFileMutation();
  const [createImageBannerMutation] = useCreateImageBannerMutation();

  const handleUploadImg = async (evt: BaseSyntheticEvent) => {
    setLoadImage(true);
    const file = evt.target.files[0];
    if (file) {
      try {
        const imgObj = await validateImg(file, variantBanner);
        if (imgObj.isValid) {
          await handleSaveImageBannerToBack(file);
        } else {
          openModalInfo(imgObj.img);
        }
      } catch (err: unknown) {
        handlerError(err);
      } finally {
        setLoadImage(false);
      }
    }
  };

  const handleSaveImageBannerToBack = async (file: File) => {
    try {
      const response = await uploadImageFileMutation({
        variables: {
          file: file,
        },
      });
      if (response && response.data?.upload.data?.id) {
        await createImageBannerMutation({
          variables: {
            data: { image: response.data.upload.data.id, size: variantBanner },
            locale: updateSelectLanguage,
          },
          refetchQueries: [
            {
              query: GetBannersDocument,
              variables: VariablesGetBanners(selectLanguages, variantBanner),
            },
          ],
        });
      }
    } catch (err: unknown) {
      handlerError(err);
    }
  };

  return (
    <Box width="290px" mb="50px">
      <Button
        fullWidth
        variant="outlined"
        sx={{
          '&': {
            border: '1px solid #97A408',
            borderRadius: '10px',
            height: '50px',
          },
        }}
      >
        {(uploadFile || loadImage) && <CircularProgress size={20} sx={{ color: '#97A408' }} />}
        {(!uploadFile || !loadImage) && (
          <>
            <Typography color="#97A408" fontSize="20px" mb="5px">
              +&nbsp;
            </Typography>
            <TranslatedField color="#97A408" originText="addBanner" isTranslate />
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
    </Box>
  );
};
