export const DiscountLabel = ({ discount }: { discount: number }) => (
  <div className="flex items-center justify-center text-center w-32 h-[120px] bg-[#F6543E] rounded-full font-bold text-[32px] leading-10 text-white">{`${discount} %`}</div>
);
