import { Enum_Banner_Size } from '../../../__generated__/types';

export const WIDTH_UPLOAD_IMAGE = 300;
export const HEIGHT_UPLOAD_IMAGE = 300;

export function validateImg(
  fileImg: File,
  variantBanner: Enum_Banner_Size,
): Promise<{ isValid: boolean; img: HTMLImageElement }> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.addEventListener('load', evt => {
      const img = new Image();
      if (evt && evt?.target?.result && typeof evt.target.result === 'string') {
        img.src = evt.target.result;

        img.addEventListener('load', () => {
          const height = img.height;
          const width = img.width;

          const aspect = width / height;
          let minAspect;
          let maxAspect;
          if (variantBanner === Enum_Banner_Size.Desktop) {
            minAspect = WIDTH_UPLOAD_IMAGE / HEIGHT_UPLOAD_IMAGE - 0.1;
            maxAspect = WIDTH_UPLOAD_IMAGE / HEIGHT_UPLOAD_IMAGE + 0.1;
          } else {
            minAspect = WIDTH_UPLOAD_IMAGE_MOBILE / HEIGHT_UPLOAD_IMAGE - 0.1;
            maxAspect = WIDTH_UPLOAD_IMAGE_MOBILE / HEIGHT_UPLOAD_IMAGE + 0.1;
          }

          // console.log(height, width, aspect);
          if (aspect > minAspect && aspect < maxAspect && fileImg.size < 1e6) {
            resolve({ isValid: true, img });
          } else {
            resolve({ isValid: false, img });
          }
        });
      }
    });
  });
}
