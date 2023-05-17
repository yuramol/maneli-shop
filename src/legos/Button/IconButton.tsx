import { Icon } from '../Icon';
import { IconButtonProps } from './types';

export const IconButton = ({
  onClick,
  icon,
  type,
  className,
  color,
  height,
  width,
  size,
  props,
}: IconButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      <Icon icon={icon} color={color} size={size} height={height} width={width} />
    </button>
  );
};
