export const DiscountLabel = ({ discount }: { discount: number }) => (
  <div className="flex items-center justify-center text-center w-10 sm:w-32 h-10 sm:h-[120px] bg-[#F6543E] rounded-full font-bold text-xs sm:text-[32px] leading-10 text-white">{`${discount} %`}</div>
);
