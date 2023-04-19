import { ComponentContainer } from '@/layouts';
import { Logo } from '@/legos';

export const Footer = () => (
  <footer className="z-[-1] bg-[#F4F3FD]">
    <ComponentContainer>
      <div
        id="footer-contact-container"
        className="relative flex justify-start py-8 sm:py-10"
      >
        <div>
          <h1 className="mb-3 sm:mb-10 font-bold text-2xl sm:text-[42px] sm:leading-[54px] tracking-[0.01rem]">
            Контакти
          </h1>
          <p className="mb-3 font-semibold text-sm sm:text-base">
            manko@gmail.com
          </p>
          <p className="mb-5 sm:mb-8 font-semibold text-sm sm:text-base">
            + 38 063 76 75 891
          </p>
          <p className="font-bold text-xs tracking-[0.02rem]">
            Манелі – інтернет магазин популярних товарів
          </p>
        </div>
        <div className="absolute right-0 pt-1 sm:pt-6">
          <Logo />
        </div>
      </div>
    </ComponentContainer>
  </footer>
);
