/* eslint-disable no-console */
import React, { BaseSyntheticEvent, FC, useState } from 'react';
import { Image } from 'mui-image';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import { Icon } from '../../../legos';
import { TranslatedField } from '../../../components/Layout/components/TranslatedField/TranslatedField';
import {
  HEIGHT_UPLOAD_IMAGE,
  validateImg,
  WIDTH_UPLOAD_IMAGE,
  WIDTH_UPLOAD_IMAGE_MOBILE,
} from '../utils/constans';
import { AUTO_BRO_API } from '../../../helpers/constants';
import { GetBannersDocument } from '../../../graphql/queries/__generated__/getBanners';
import { useReplaceBannerMutation } from '../../../graphql/mutations/__generated__/replaceBanner';
import { useUploadImageFileMutation } from '../../../graphql/mutations/__generated__/uploadImageFile';
import { VariablesGetBanners } from '../../../graphql/queries/hook/useGetBanners';
import { useLocalization } from '../../../localization';
import { Enum_Banner_Size } from '../../../__generated__/types';
import { handlerError } from '../../../helpers/functions';

interface Props {
  imgUrl: string;
  bannerId: string;
  openModalRemove(idImg: string, urlImg: string): void;
  openModalInfo(img: HTMLImageElement): void;
  variantBanner: Enum_Banner_Size;
}
const Scale = 0.75;
const ScaleMobile = 1;

export const BannerImage: FC<Props> = ({
  imgUrl,
  bannerId,
  openModalRemove,
  openModalInfo,
  variantBanner,
}) => {
  const { selectLanguages } = useLocalization();
  const [loadImage, setLoadImage] = useState(false);
  const [uploadImageFileMutation] = useUploadImageFileMutation();
  const [replaceBannerMutation, { loading: loadReplaceBanner }] = useReplaceBannerMutation();

  const handleUploadImg = async (evt: BaseSyntheticEvent) => {
    setLoadImage(true);
    const file = evt.target.files[0];
    if (file) {
      try {
        const imgObj = await validateImg(file, variantBanner);
        if (imgObj.isValid) {
          await handleReplaceBanner(file);
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
  const handleDeleteBanner = () => {
    openModalRemove(bannerId, imgUrl);
  };
  const handleReplaceBanner = async (file: File) => {
    try {
      const response = await uploadImageFileMutation({
        variables: {
          file: file,
        },
      });
      if (response && response.data?.upload.data?.id) {
        // console.log('uploadImageFileMutation', response);
        await replaceBannerMutation({
          variables: {
            data: { image: response.data.upload.data.id, size: variantBanner },
            id: bannerId,
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

  const widthImage =
    variantBanner === Enum_Banner_Size.Desktop ? WIDTH_UPLOAD_IMAGE : WIDTH_UPLOAD_IMAGE_MOBILE;
  const scale = variantBanner === Enum_Banner_Size.Desktop ? Scale : ScaleMobile;

  return (
    <Box mb={4} display="flex">
      {/*<Icon size="large" icon="dragIndicator" />*/}
      <Box
        width={`${widthImage * scale}px`}
        height={`${HEIGHT_UPLOAD_IMAGE * scale}px`}
        position="relative"
        borderRadius={3}
        overflow="hidden"
      >
        <Image src={`${AUTO_BRO_API}${imgUrl}`} />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.7)"
          sx={{
            '&': {
              opacity: 0,
              transition: 'opacity 0.5s linear',
            },
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <TranslatedField fontSize="22px" color="#fff" originText="repBanImg" isTranslate />
          <Box display="flex">
            <TranslatedField
              fontSize="18px"
              color="#fff"
              // originText="Вимоги до зображення: формат - Jpeg, розмір - 1212х300 px "
              originText="imgRequirementsFormat"
              suffix=","
              isTranslate
            />
            <Typography>&nbsp;</Typography>
            <TranslatedField
              fontSize="18px"
              color="#fff"
              originText="size"
              suffix={
                variantBanner === Enum_Banner_Size.Desktop ? ' - 1212х300 px ' : ' - 600х300 px '
              }
              isTranslate
            />
          </Box>

          <Box color="#fff" mt={3}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                textTransform: 'none',
                marginRight: '24px',
                minWidth: '156px',
                height: '38px',
              }}
            >
              {(loadImage || loadReplaceBanner) && (
                <CircularProgress size={20} sx={{ color: '#fff' }} />
              )}
              {!loadImage && !loadReplaceBanner && (
                <TranslatedField
                  capitalLetter
                  originText="replaceImg"
                  fontSize={18}
                  isTranslate
                  noWrap
                  color="white"
                />
              )}
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
            </Button>
            <IconButton color="inherit" onClick={handleDeleteBanner}>
              <Icon icon="deleting" size="large" />
              <TranslatedField originText="del" isTranslate fontSize="20px" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
