import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const ComponentContainer: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[1232px] w-full px-4 my-0 mx-auto">{children}</div>
  );
};
