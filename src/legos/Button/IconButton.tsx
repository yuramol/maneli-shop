import { Icon } from '../Icon';
import { IconButtonProps } from './types';

export const IconButton = ({
  onClick,
  icon,
  type = 'button',
  className,
  color,
  disabled,
  height,
  width,
  size,
  props,
}: IconButtonProps) => {
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick} {...props}>
      <Icon icon={icon} color={color} size={size} height={height} width={width} />
    </button>
  );
};
