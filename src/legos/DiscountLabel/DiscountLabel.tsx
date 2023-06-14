export const DiscountLabel = ({
  smallSize = false,
  discount,
}: {
  smallSize?: boolean;
  discount: number;
}) => (
  <div className={`absolute right-3 top-3 z-10${smallSize ? '' : ' sm:right-6 sm:top-6'}`}>
    <div
      className={`flex items-center justify-center text-center bg-[#F6543E] rounded-full text-white ${
        smallSize
          ? 'w-8 h-8 text-xs font-semibold'
          : 'w-[64px] h-[64px] text-base font-bold sm:w-32 sm:h-32 sm:text-3xl'
      }`}
    >{`-${discount}%`}</div>
  </div>
);
