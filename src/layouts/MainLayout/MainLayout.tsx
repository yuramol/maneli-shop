import { FC, ReactNode } from 'react';

// import { Header, Footer } from 'components';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    // <Header />
    <main className="flex flex-col min-h-screen">
      <div className="flex w-full">
        <div className="flex w-full h-full">{children}</div>
      </div>
    </main>
    // <Footer />
  );
};
