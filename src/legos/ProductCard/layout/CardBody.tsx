import { Rate } from '@/legos';

export const CardBody = ({
  title,
  price,
  discount,
}: {
  title: string;
  price: number;
  discount: number;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-4 mb-2">
      <h3 className="font-bold text-base">{title}</h3>
      <div className="flex gap-6">
        <p className="text-[#F6543E] font-semibold text-2xl">
          {`${price * (1 - discount / 100)} ₴`}
        </p>
        <p className="text-[#828282] text-2xl line-through">{`${price} ₴`}</p>
      </div>
      <Rate rate={4.9} />
      <button className="rounded-full bg-[#404969] text-white h-16">
        Замовити
      </button>
    </div>
  );
};
