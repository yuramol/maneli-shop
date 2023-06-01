export type Props = {
  isOpen: boolean;
  toggleForm: () => void;
  productVideo?: string | null;
};

export enum VideoFields {
  Video = 'video',
}
