import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const ComponentContainer: FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="max-w-md w-full px-4 m-auto"
      style={{
        maxWidth: '1230px',
        margin: '0 auto',
        padding: '0 15px',
      }}
    >
      {children}
    </div>
  );
};
