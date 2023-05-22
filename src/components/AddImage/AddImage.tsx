import { BaseSyntheticEvent, useState } from 'react';
import { BannerImage } from './components/BannerImage';
import { ButtonAddBanner } from './components/ButtonAddBanner';

export const AddImage = () => {
  const [loadingSrc, setLoadingSrc] = useState(undefined);

  // const { banners } = useGetBanners({ size: variantBanner });

  const handleUploadImg = async (evt: BaseSyntheticEvent) => {
    const file = evt.target.files[0];
    setLoadingSrc(file);

    if (file) {
      try {
        console.log('debug > handleClick===', file);
      } catch (err: unknown) {
        console.log('err===', err);
      } finally {
      }
    }
  };

  return !loadingSrc ? (
    <BannerImage
      // imgUrl={banner.imgUrl}
      handleUploadImg={handleUploadImg}
    />
  ) : (
    <ButtonAddBanner loadingSrc={loadingSrc} handleUploadImg={handleUploadImg} />
  );
};
