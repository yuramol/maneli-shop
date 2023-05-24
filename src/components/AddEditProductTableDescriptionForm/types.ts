export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  editTableDescriptionID?: string;
  productTableDescriptions:
    | ({
        __typename?: 'ComponentProductProductTableDescriptions' | undefined;
        id: string;
        text?: string | null | undefined;
        value?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
};

export enum TableDescriptionFields {
  ID = 'id',
  Text = 'text',
  Value = 'value',
}
