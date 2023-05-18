import { useState } from 'react';
import { BannerImage } from './components/BannerImage';
import { ButtonAddBanner } from './components/ButtonAddBanner';
// import { ModalDeleteConfirm } from './components/ModalDeleteConfirm';

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
  const [dataModal, setDataModal] = useState<ModalType>({ isOpen: false, fileImg: null });
  // const [dataModalRemove, setDataModalRemove] = useState<ModalTypeRemove>({
  //   isOpen: false,
  //   imgUrl: '',
  //   imgID: '',
  // });
  // const { banners } = useGetBanners({ size: variantBanner });

  const handleOpenModal = (fileImg: HTMLImageElement) => {
    setDataModal({
      isOpen: true,
      fileImg,
    });
  };
  // const handleDeleteBanner = async () => {
  //   await removeBannerMutation({
  //     variables: {
  //       id: dataModalRemove.imgID,
  //     },
  //     refetchQueries: [
  //       {
  //         query: GetBannersDocument,
  //         variables: VariablesGetBanners(selectLanguages, variantBanner),
  //       },
  //     ],
  //   });
  // };

  return (
    <>
      <div className="w-full">
        <BannerImage
          imgUrl={banner.imgUrl}
          bannerId={banner.id}
          openModalRemove={(imgID, imgUrl) => {
            setDataModalRemove({ isOpen: true, imgUrl, imgID });
          }}
          openModalInfo={handleOpenModal}
        />
      </div>
      <div className="w-full">
        <ButtonAddBanner openModalInfo={handleOpenModal} />
      </div>
      {/* {dataModalRemove.isOpen && (
        <ModalDeleteConfirm
          closeSuccessModal={() => setDataModalRemove({ isOpen: false, imgUrl: '', imgID: '' })}
          handlerConfirm={handleDeleteBanner}
          imgUrl={dataModalRemove.imgUrl}
        />
      )} */}
    </>
  );
};
