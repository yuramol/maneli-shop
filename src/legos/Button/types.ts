import { IconProps, IconsNames } from '../Icon/types';

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  color: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  props?: any;
};

export type IconButtonProps = {
  onClick?: () => void;
  icon: IconsNames;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  color?: string;
  disabled?: boolean;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  props?: any;
};
