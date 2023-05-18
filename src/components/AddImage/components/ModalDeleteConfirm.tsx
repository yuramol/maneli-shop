import React, { FC } from 'react';
import { Avatar, Box, Button, Stack } from '@mui/material';
import { TranslatedField } from '../../../components/Layout/components/TranslatedField/TranslatedField';
import { CustomModal } from '../../../components';
import { useLocalization } from '../../../localization';
import { HEIGHT_UPLOAD_IMAGE, WIDTH_UPLOAD_IMAGE } from '../utils/constans';
import { AUTO_BRO_API } from '../../../helpers/constants';

const Scale = 0.32;
interface Props {
  imgUrl: string;
  closeSuccessModal(): void;
  handlerConfirm(): void;
}
export const ModalDeleteConfirm: FC<Props> = ({ closeSuccessModal, handlerConfirm, imgUrl }) => {
  const { translateLang } = useLocalization();

  const onConfirm = () => {
    handlerConfirm();
    closeSuccessModal();
  };

  return (
    <CustomModal title={translateLang('deleteConfirm')} handleClose={closeSuccessModal} open={true}>
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
          src={`${AUTO_BRO_API}${imgUrl}`}
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
      <TranslatedField originText="deleteBannerConfirm" isTranslate fontSize={20} color="black" />
      <Stack flexDirection="row" mt={5}>
        <Button
          onClick={closeSuccessModal}
          variant="contained"
          color="secondary"
          style={{
            width: '80%',
            height: '95%',
            marginRight: '2px',
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
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          style={{
            width: '80%',
            height: '95%',
            marginLeft: '2px',
          }}
        >
          <TranslatedField
            originText={translateLang('del')}
            fontSize={16}
            isTranslate
            noWrap
            color="white"
          />
        </Button>
      </Stack>
    </CustomModal>
  );
};
