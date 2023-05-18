import { FC } from 'react';

import { IconsMap } from './helpers';
import { IconProps } from './types';

export const Icon: FC<IconProps> = ({ icon, height, width, color, size, ...props }) => {
  const Render = IconsMap[icon];

  const computedColor = color ?? 'currentColor';

  return (
    <Render
      fontSize={size}
      height={height || size}
      width={width || size}
      color={computedColor}
      {...props}
    />
  );
};

export * from './types';
