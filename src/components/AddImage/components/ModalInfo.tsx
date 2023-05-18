import React, { FC } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { TranslatedField } from '../../../components/Layout/components/TranslatedField/TranslatedField';
import { CustomModal } from '../../../components';
import { useLocalization } from '../../../localization';
import { HEIGHT_UPLOAD_IMAGE, WIDTH_UPLOAD_IMAGE } from '../utils/constans';
import { Enum_Banner_Size } from '../../../__generated__/types';

const Scale = 0.32;
interface Props {
  closeModal(): void;
  imgFile: HTMLImageElement | null;
  variantBanner: Enum_Banner_Size;
}
export const ModalInfo: FC<Props> = ({ imgFile, closeModal, variantBanner }) => {
  const { translateLang } = useLocalization();

  return (
    <CustomModal
      title={translateLang('downloadImage')}
      handleClose={closeModal}
      open={true}
      width={`${WIDTH_UPLOAD_IMAGE * Scale}px`}
    >
      <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
        <Box
          borderRadius={2}
          overflow="hidden"
          bgcolor="#e2e2e2"
          mb={3}
          width={`${WIDTH_UPLOAD_IMAGE * Scale}px`}
          height={`${HEIGHT_UPLOAD_IMAGE * Scale}px`}
        >
          <Avatar
            alt="Remy Sharp"
            src={imgFile?.src}
            variant="rounded"
            sx={{
              width: '100%',
              height: '100%',
              '& img': {
                objectFit: 'contain',
              },
            }}
          />
        </Box>
        <TranslatedField
          originText={
            variantBanner === Enum_Banner_Size.Desktop ? 'validImgSize' : 'validImgSizeMobile'
          }
          isTranslate
          fontSize={20}
          color="black"
        />
        <Button
          onClick={closeModal}
          variant="contained"
          color="secondary"
          fullWidth
          style={{
            marginTop: '20px',
          }}
        >
          <TranslatedField
            originText={translateLang('cancel')}
            fontSize={16}
            isTranslate
            noWrap
            color="white"
          />
        </Button>
      </Box>
    </CustomModal>
  );
};
