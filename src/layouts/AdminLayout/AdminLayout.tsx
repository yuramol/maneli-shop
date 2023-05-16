import { Footer, Header } from '@/components';
import { FC, ReactNode } from 'react';
import { SideBar } from '../../components/SideBar';

interface LayoutProps {
  children: ReactNode;
}

export const AdminLayout: FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col sm:flex-row overflow-hidden">
    <div className="sticky top-0">
      <SideBar />
    </div>
    <div className="container mx-auto">{children}</div>
  </div>
);
