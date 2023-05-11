import { ProductCard } from '@/legos';
import { productInfo } from '@/legos/ProductCard/helper';

const productData = [
  { id: 1, productData: productInfo(1) },
  { id: 2, productData: productInfo(2) },
  { id: 3, productData: productInfo(3) },
  { id: 4, productData: productInfo(4) },
  { id: 5, productData: productInfo(5) },
  { id: 6, productData: productInfo(6) },
  { id: 7, productData: productInfo(7) },
];

export const CatalogPageContainer = () => (
  <div className="flex flex-col w-full my-4 sm:my-10 lg:my-20">
    <h1 className="mb-4 sm:mb-10 font-bold text-2xl sm:text-[42px] sm:leading-[54px] tracking-[0.01rem]">
      Каталог товарів <span className="text-[#F6543E]">-40%</span>
    </h1>
    <div className="flex flex-wrap mx-[-8px] sm:mx-[-20px]">
      {productData.map(({ id, productData }) => (
        <div key={id} className="w-[50%] md:w-[33.33%] px-2 sm:px-5">
          <ProductCard productInfo={productData} />
        </div>
      ))}
    </div>
  </div>
);
