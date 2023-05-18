import { Icon } from '../Icon';
import { IconButtonProps } from './types';

export const IconButton = (props: IconButtonProps) => {
  const {
    onClick,
    icon,
    type = 'button',
    className,
    color,
    disabled,
    height,
    width,
    size,
    ...rest
  } = props;

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick} {...rest}>
      <Icon icon={icon} color={color} size={size} height={height} width={width} />
    </button>
  );
};
