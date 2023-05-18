import React, { ReactNode, SyntheticEvent, useState } from 'react';
import { WrapperPages } from '../../components/Wrapper/WrapperPages';
import { useLocalization } from '../../localization';
import { Box, Tab, Tabs } from '@mui/material';
import { BannerImage } from './components/BannerImage';
import { ButtonAddBanner } from './components/ButtonAddBanner';
import { ModalInfo } from './components/ModalInfo';
import { useGetBanners, VariablesGetBanners } from '../../graphql/queries/hook/useGetBanners';
import { ModalDeleteConfirm } from './components/ModalDeleteConfirm';
import { GetBannersDocument } from '../../graphql/queries/__generated__/getBanners';
import { useRemoveBannerMutation } from '../../graphql/mutations/__generated__/removeBanner';
import { Enum_Banner_Size } from '../../__generated__/types';

interface ModalType {
  isOpen: boolean;
  fileImg: HTMLImageElement | null;
}
interface ModalTypeRemove {
  isOpen: boolean;
  imgUrl: string;
  imgID: string;
}

export const AddBanner = () => {
  const { translateLang, selectLanguages } = useLocalization();
  const [removeBannerMutation] = useRemoveBannerMutation();
  const [variantBanner, setVariantBanner] = useState<Enum_Banner_Size>(Enum_Banner_Size.Desktop);
  const [dataModal, setDataModal] = useState<ModalType>({ isOpen: false, fileImg: null });
  const [dataModalRemove, setDataModalRemove] = useState<ModalTypeRemove>({
    isOpen: false,
    imgUrl: '',
    imgID: '',
  });
  const { banners } = useGetBanners({ size: variantBanner });

  const handleOpenModal = (fileImg: HTMLImageElement) => {
    setDataModal({
      isOpen: true,
      fileImg,
    });
  };
  const handleDeleteBanner = async () => {
    await removeBannerMutation({
      variables: {
        id: dataModalRemove.imgID,
      },
      refetchQueries: [
        {
          query: GetBannersDocument,
          variables: VariablesGetBanners(selectLanguages, variantBanner),
        },
      ],
    });
  };
  const getBanners = (): ReactNode[] | null => {
    if (banners && banners.length) {
      return banners.map((banner, index) => (
        <BannerImage
          key={banner?.id || index.toString()}
          imgUrl={banner.imgUrl}
          bannerId={banner.id}
          openModalRemove={(imgID, imgUrl) => {
            setDataModalRemove({ isOpen: true, imgUrl, imgID });
          }}
          openModalInfo={handleOpenModal}
          variantBanner={variantBanner}
        />
      ));
    }
    return null;
  };
  const handleChangeTab = (event: SyntheticEvent, newValue: Enum_Banner_Size) => {
    setVariantBanner(newValue);
  };

  return (
    <WrapperPages titleHeader={translateLang('bannerOfHome')}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={variantBanner}
        onChange={handleChangeTab}
        sx={{
          '& .Mui-selected': {
            color: '#545d75',
            fontWeight: 600,
          },
          '& button': {
            minWidth: 30,
          },
        }}
      >
        <Tab value={Enum_Banner_Size.Desktop} label={translateLang('bannerForDesktop')} />
        <Tab value={Enum_Banner_Size.Mobile} label={translateLang('bannerForMobile')} />
      </Tabs>
      <Box mt={6} width="100%" display="flex" flexDirection="column" alignItems="center">
        {getBanners()}
      </Box>
      <Box width="100%" flex={1} display="flex" flexDirection="column" alignItems="center">
        <ButtonAddBanner variantBanner={variantBanner} openModalInfo={handleOpenModal} />
      </Box>
      <>
        {dataModal.isOpen && (
          <ModalInfo
            closeModal={() => setDataModal({ isOpen: false, fileImg: null })}
            imgFile={dataModal.fileImg}
            variantBanner={variantBanner}
          />
        )}
        {dataModalRemove.isOpen && (
          <ModalDeleteConfirm
            closeSuccessModal={() => setDataModalRemove({ isOpen: false, imgUrl: '', imgID: '' })}
            handlerConfirm={handleDeleteBanner}
            imgUrl={dataModalRemove.imgUrl}
          />
        )}
      </>
    </WrapperPages>
  );
};
