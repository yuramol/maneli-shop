import { CSSProperties, ElementType } from 'react';

export type IconsNames =
  | 'Close'
  | 'Burger'
  | 'Login'
  | 'ArrowCircleLeft'
  | 'ArrowCircleRight'
  | 'CalendarDate'
  | 'CreditCardShield'
  | 'Scales'
  | 'ShieldTick'
  | 'Minus'
  | 'Plus'
  | 'Edit'
  | 'Delete';

export type IconsNamesMapType = {
  [key in IconsNames]: ElementType;
};

export interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  icon: IconsNames;
  size?: string | number;
  style?: CSSProperties & { pathColor?: string; circleOpacity?: number };
}

export type IconCommonProps = {
  width?: number | string;
  height?: number | string;
  circleOpacity?: number;
  pathColor?: string;
  style?: CSSProperties & { pathColor?: string; circleOpacity?: number };
  color?: string;
};
