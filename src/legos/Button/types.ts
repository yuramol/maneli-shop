import { IconProps, IconsNames } from '../Icon/types';

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  color: string;
  disabled?: boolean;
  className?: string;
  props?: any;
};

export type IconButtonProps = {
  onClick?: () => void;
  icon: IconsNames;
  className?: string;
  color?: string;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  props?: any;
};
