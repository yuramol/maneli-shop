import { Footer } from '@/components';
import { MainLayout, ComponentContainer } from '@/layouts';
import { ProductCard } from '@/legos';
import { productInfo } from '@/legos/ProductCard/helper';

export default function Home() {
  return (
    <MainLayout>
      <ComponentContainer>
        <ProductCard productInfo={productInfo} />
      </ComponentContainer>
    </MainLayout>
  );
}
