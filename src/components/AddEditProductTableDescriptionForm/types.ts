import { ComponentProductProductTableDescriptions, Maybe } from '@/__generated__/types';

export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  editTableDescriptionID?: string;
  productTableDescriptions?: Maybe<Array<Maybe<ComponentProductProductTableDescriptions>>>;
};

export enum TableDescriptionFields {
  ID = 'id',
  Text = 'text',
  Value = 'value',
}
