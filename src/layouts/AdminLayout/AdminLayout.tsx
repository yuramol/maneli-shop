import { FC, ReactNode } from 'react';
import { SideBar } from '../../components/SideBar';
import { AdminComponentContainer } from './AdminComponentContainer';

interface LayoutProps {
  children: ReactNode;
}

export const AdminLayout: FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col sm:flex-row max-w-[1232px] mx-auto">
    <div className="sticky z-10 top-0 bg-white">
      <SideBar />
    </div>
    <AdminComponentContainer>{children}</AdminComponentContainer>
  </div>
);
