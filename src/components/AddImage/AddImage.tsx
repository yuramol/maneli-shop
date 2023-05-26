import { BaseSyntheticEvent, FC, useState } from 'react';
import { BannerImage } from './components/BannerImage';
import { ButtonAddBanner } from './components/ButtonAddBanner';
import { Scalars } from '@/__generated__/types';
import { Maybe } from '@/__generated__/types';

type Props = {
  currentImageID?: Maybe<Scalars['ID']>;
};

export const AddImage: FC<Props> = ({ currentImageID }) => {
  const [loadingSrc, setLoadingSrc] = useState(undefined);

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
    <BannerImage imgUrl={currentImageID as string} handleUploadImg={handleUploadImg} />
  ) : (
    <ButtonAddBanner loadingSrc={loadingSrc} handleUploadImg={handleUploadImg} />
  );
};
