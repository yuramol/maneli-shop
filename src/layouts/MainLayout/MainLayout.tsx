import { Footer, Header } from '@/components';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen ">
    <Header />
    <main className="flex flex-col flex-auto min-h-full w-full h-full overflow-hidden">
      {children}
    </main>
    <Footer />
  </div>
);
