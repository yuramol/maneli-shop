/* eslint-disable no-console */
import React, { BaseSyntheticEvent, FC, useState } from 'react';
import Image from 'next/image';

import { HEIGHT_UPLOAD_IMAGE, WIDTH_UPLOAD_IMAGE } from '../helper';
import { Button } from '@/legos';
import productImage from '../../assets/rectangle-25.png';

interface Props {
  imgUrl: string;
  bannerId: string;
  openModalInfo(img: HTMLImageElement): void;
}
const Scale = 0.75;
const ScaleMobile = 1;

export const BannerImage: FC<Props> = ({ imgUrl, bannerId, openModalInfo }) => {
  const [loadImage, setLoadImage] = useState(false);

  // const handleUploadImg = async (evt: BaseSyntheticEvent) => {
  //   setLoadImage(true);
  //   const file = evt.target.files[0];
  //   if (file) {
  //     try {
  //       const imgObj = await validateImg(file, variantBanner);
  //       if (imgObj.isValid) {
  //         await handleReplaceBanner(file);
  //       } else {
  //         openModalInfo(imgObj.img);
  //       }
  //     } catch (err: unknown) {
  //       handlerError(err);
  //     } finally {
  //       setLoadImage(false);
  //     }
  //   }
  // };
  // const handleDeleteBanner = () => {
  //   openModalRemove(bannerId, imgUrl);
  // };
  // const handleReplaceBanner = async (file: File) => {
  //   try {
  //     const response = await uploadImageFileMutation({
  //       variables: {
  //         file: file,
  //       },
  //     });
  //     if (response && response.data?.upload.data?.id) {
  //       // console.log('uploadImageFileMutation', response);
  //       await replaceBannerMutation({
  //         variables: {
  //           data: { image: response.data.upload.data.id, size: variantBanner },
  //           id: bannerId,
  //         },
  //         refetchQueries: [
  //           {
  //             query: GetBannersDocument,
  //             variables: VariablesGetBanners(selectLanguages, variantBanner),
  //           },
  //         ],
  //       });
  //     }
  //   } catch (err: unknown) {
  //     handlerError(err);
  //   }
  // };

  return (
    <div mb={4} display="flex">
      {/*<Icon size="large" icon="dragIndicator" />*/}
      <div
        width={`${WIDTH_UPLOAD_IMAGE}px`}
        height={`${HEIGHT_UPLOAD_IMAGE}px`}
        position="relative"
        borderRadius={3}
        overflow="hidden"
      >
        <Image src={productImage} alt="Product photo" />
        <div
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
          <p fontSize="22px" color="#fff" originText="repBanImg" isTranslate />
          <div display="flex">
            <p
              fontSize="18px"
              color="#fff"
              // originText="Вимоги до зображення: формат - Jpeg, розмір - 1212х300 px "
              originText="imgRequirementsFormat"
              suffix=","
              isTranslate
            />
            <p>&nbsp;</p>
            <p
              fontSize="18px"
              color="#fff"
              originText="size"
              suffix={
                variantBanner === Enum_Banner_Size.Desktop ? ' - 1212х300 px ' : ' - 600х300 px '
              }
              isTranslate
            />
          </div>

          <div color="#fff" mt={3}>
            <Button
              style={{
                textTransform: 'none',
                marginRight: '24px',
                minWidth: '156px',
                height: '38px',
              }}
            >
              {!loadImage && !loadReplaceBanner && (
                <p
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
            {/* <IconButton color="inherit" onClick={handleDeleteBanner}>
              <Icon icon="deleting" size="large" />
              <p originText="del" isTranslate fontSize="20px" />
            </IconButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};
