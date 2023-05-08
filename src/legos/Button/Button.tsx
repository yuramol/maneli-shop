import { ButtonProps } from './types';

export const Button = ({
  title,
  onClick,
  width = '120px',
  height = '40px',
  color,
  disabled = false,
  className,
  props,
}: ButtonProps) => {
  return (
    <button
      className={`w-[${width}] h-[${height}] bg-[${color}] ${
        disabled ? 'opacity-50 cursor-default' : 'opacity-80  hover:opacity-90 active:opacity-100'
      }  text-white rounded-full font-semibold text-xs ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: color,
        height: height || 'unset',
        width: width || 'unset',
      }}
      {...props}
    >
      {title}
    </button>
  );
};
