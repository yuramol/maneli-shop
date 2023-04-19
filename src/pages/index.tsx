import { Footer } from '@/components';
import { MainLayout, ComponentContainer } from '@/layouts';
import { ProductCard } from '@/legos';
import { productInfo } from '@/legos/ProductCard/helper';

export default function Home() {
  return (
    <MainLayout>
      <ComponentContainer>
        <div className="w-full bg-slate-400 h-[300px]"></div>
        <ProductCard productInfo={productInfo} />
      </ComponentContainer>
    </MainLayout>
  );
}
