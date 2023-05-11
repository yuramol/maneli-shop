export const DiscountLabel = ({ discount }: { discount: number }) => (
  <div className="flex items-center justify-center text-center w-10 h-10 sm:w-32 sm:h-32 bg-[#F6543E] rounded-full font-bold text-xs sm:text-3xl leading-10 text-white">{`-${discount}%`}</div>
);
