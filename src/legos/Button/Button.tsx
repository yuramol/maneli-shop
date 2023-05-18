import { ButtonProps } from './types';

export const Button = (props: ButtonProps) => {
  const {
    title,
    onClick,
    width = '120px',
    height = '40px',
    color,
    disabled = false,
    className,
    type,
    ...rest
  } = props;
  return (
    <button
      className={`w-[${width}] h-[${height}] bg-[${color}] ${
        disabled ? 'opacity-50 cursor-default' : 'opacity-80  hover:opacity-90 active:opacity-100'
      }  text-white rounded-full font-semibold text-xs ${className}`}
      onClick={onClick}
      type={type}
      style={{
        backgroundColor: color,
        height: height || 'unset',
        width: width || 'unset',
      }}
      {...rest}
    >
      {title}
    </button>
  );
};
