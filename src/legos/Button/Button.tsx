type ButtonProps = {
  title: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  color: string;
  disabled?: boolean;
  className?: string;
  props?: any;
};

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
  console.log('%c jordan color', 'color: lime;', color);
  return (
    <button
      className={`w-[${width}] h-[${height}] bg-[${color}]  sm:h-[40px] ${
        disabled ? 'opacity-50 cursor-default' : 'opacity-80  hover:opacity-90 active:opacity-100'
      }  text-white rounded-full font-semibold text-xs ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: color,
        height: height || 'unset',
      }}
      {...props}
    >
      {title}
    </button>
  );
};
