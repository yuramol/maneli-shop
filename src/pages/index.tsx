import { CatalogPageContainer } from '@/components';
import { MainLayout, ComponentContainer } from '@/layouts';

export default function Home() {
  return (
    <MainLayout>
      <ComponentContainer>
        <CatalogPageContainer />
      </ComponentContainer>
    </MainLayout>
  );
}
