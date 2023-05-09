import { ButtonHTMLAttributes } from 'react';

export const BurgerButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props}>
      <svg
        width="38"
        height="16"
        viewBox="0 0 38 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H37M1 15H37"
          stroke="#2E0F42"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
