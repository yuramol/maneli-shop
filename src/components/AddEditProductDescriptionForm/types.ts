export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  editProductDescriptionID?: string;
  productDescriptions?: Array<{
    id: string;
    title?: string | null;
    productDescriptionsPost?: Array<{
      id: string;
      title?: string | null;
      descriptions?: string | null;
      image?: {
        data?: {
          id?: string | null;
          attributes?: {
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
};

export enum DescriptionFields {
  ID = 'id',
  Title = 'title',
  Descriptions = 'descriptions',
  Image = 'image',
}
