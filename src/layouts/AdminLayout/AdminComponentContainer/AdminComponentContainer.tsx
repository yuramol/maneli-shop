import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const AdminComponentContainer: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full px-4 my-0">{children}</div>
  );
};
