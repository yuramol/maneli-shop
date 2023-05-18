import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const AdminComponentContainer: FC<LayoutProps> = ({ children }) => {
  return <div className="w-full p-4 sm:p-8 h-screen max-h-[100vh] overflow-auto">{children}</div>;
};
