import { Maybe, Product, ProductEntity } from '@/__generated__/types';
import { ProductQuery } from '@/graphql/queries/__generated__/product';

export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  product?: {
    __typename?: 'ProductEntity';
    id?: string | null;
    attributes?: {
      __typename?: 'Product';
      title?: string | null;
      price?: number | null;
      rating?: number | null;
      discount?: number | null;
      description?: string | null;
      imagePreview?: {
        __typename?: 'UploadFileEntityResponse';
        data?: {
          __typename?: 'UploadFileEntity';
          id?: string | null;
          attributes?: {
            __typename?: 'UploadFile';
            url: string;
            width?: number | null;
            height?: number | null;
            alternativeText?: string | null;
            formats?: any | null;
          } | null;
        } | null;
      } | null;
      productTableDescriptions?: Array<{
        __typename?: 'ComponentProductProductTableDescriptions';
        id: string;
        text?: string | null;
        value?: string | null;
      } | null> | null;
      productDescriptions?: Array<{
        __typename?: 'ComponentProductProductDescriptions';
        id: string;
        title?: string | null;
        productDescriptionsPost?: Array<{
          __typename?: 'ComponentProductProductDescriptionsPost';
          id: string;
          title?: string | null;
          descriptions?: string | null;
          image?: {
            __typename?: 'UploadFileEntityResponse';
            data?: {
              __typename?: 'UploadFileEntity';
              id?: string | null;
              attributes?: {
                __typename?: 'UploadFile';
                url: string;
                width?: number | null;
                height?: number | null;
                alternativeText?: string | null;
                formats?: any | null;
              } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null> | null;
    } | null;
  } | null;
};

export enum AddProductFields {
  Title = 'title',
  Description = 'description',
  Price = 'price',
  Discount = 'discount',
  Rating = 'rating',
  ImagePreview = 'imagePreview',
}
