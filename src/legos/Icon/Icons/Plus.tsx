import { IconCommonProps } from '../types';

export const Plus = ({ style }: IconCommonProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M8 1V15M1 8H15"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
