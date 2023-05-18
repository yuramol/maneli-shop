import React from 'react';
import { IconProps, IconsNames } from '../Icon/types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  color: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  icon: IconsNames;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  color?: string;
  disabled?: boolean;
  size?: string | number;
  height?: string | number;
  width?: string | number;
}
