import { Maybe, Scalars } from '@/__generated__/types';
import { FC } from 'react';

type Props = {
  title: string;
  value?: Maybe<Scalars['String']>;
};

export const ProductCharacteristicItem: FC<Props> = ({ title, value }) => {
  return (
    <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6 last-of-type:mb-0">
      <dt className="font-semibold">
        {title}
        {value ? `:` : ''}
      </dt>
      {value && <dd>{value}</dd>}
    </span>
  );
};
