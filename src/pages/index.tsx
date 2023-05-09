import { MainLayout, ComponentContainer } from '@/layouts';
import { ProductCard } from '@/legos';
import { productInfo } from '@/legos/ProductCard/helper';

export default function Home() {
  return (
    <MainLayout>
      <ComponentContainer>
        <ProductCard productInfo={productInfo(1)} />
        <ProductCard productInfo={productInfo(2)} />
        <ProductCard productInfo={productInfo(3)} />
        <ProductCard productInfo={productInfo(4)} />
        <ProductCard productInfo={productInfo(5)} />
        <ProductCard productInfo={productInfo(6)} />
      </ComponentContainer>
    </MainLayout>
  );
}
