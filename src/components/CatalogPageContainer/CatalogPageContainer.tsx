import { ProductEntity } from '@/__generated__/types';
import { useProductsQuery } from '@/graphql/queries/__generated__/products';
import { ProductCard } from '@/legos';

export const CatalogPageContainer = () => {
  const { data } = useProductsQuery({
    variables: { limit: -1, filters: { status: { eq: 'active' } } },
  });

  return (
    <div className="flex flex-col w-full my-4 sm:my-10 lg:my-20">
      <h1 className="mb-4 sm:mb-10 font-bold text-2xl sm:text-[42px] sm:leading-[54px] tracking-[0.01rem]">
        Каталог товарів <span className="text-[#F6543E]">-40%</span>
      </h1>
      <div className="flex flex-wrap mx-[-8px] sm:mx-[-20px]">
        {data?.products?.data.map(product => (
          <div key={product.id} className="w-[50%] md:w-[33.33%] px-2 sm:px-5">
            <ProductCard product={product as ProductEntity} />
          </div>
        ))}
      </div>
    </div>
  );
};
