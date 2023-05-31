import { ComponentProductProductDescriptions } from '@/__generated__/types';

export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  editProductDescriptionID?: string;
  productDescriptions?: ComponentProductProductDescriptions[] | null;
};

export enum DescriptionFields {
  ID = 'id',
  Title = 'title',
  Descriptions = 'descriptions',
  Image = 'image',
}
