import { Rate } from '@/legos';
import { Button } from '@/legos/Button';
import { useMediaQuery } from 'react-responsive';
export const CardBody = ({
  title,
  price,
  discount,
}: {
  title: string;
  price: number;
  discount: number;
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className="flex flex-col gap-1 sm:gap-4 mt-4 mb-2">
      <h3 className="font-semibold sm:font-bold text-sm sm:text-base">{title}</h3>
      <div className="flex items-center gap-2 sm:gap-6">
        <p className="text-[#F6543E] font-bold sm:font-semibold text-base sm:text-2xl leading-5 sm:leading-8">
          {`${price * (1 - discount / 100)} ₴`}
        </p>
        <p className="text-[#828282] text-xs sm:text-2xl line-through leading-5 sm:leading-8">{`${price} ₴`}</p>
      </div>
      <Rate rate={4.9} />
      <Button
        title="Замовити"
        color="#404969"
        width="100%"
        height={isMobile ? '40px' : '64px'}
        className="mt-2"
      />
    </div>
  );
};
