import { useState } from 'react';
import { ComponentContainer } from '@/layouts';
import { Logo } from '@/legos';
import Link from 'next/link';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  const scrollToBottom = () => {
    const container = document.getElementById('footer-contact-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 h-16 sm:h-24 flex items-center justify-between bg-[#E6E6E6]  border-b-[1px] border-b-[#D5D2F2] border-b-solid">
      <ComponentContainer>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <button className="sm:hidden" onClick={handleMenuClick}>
              <svg
                width="38"
                height="16"
                viewBox="0 0 38 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H37M1 15H37"
                  stroke="#2E0F42"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <Logo />
          </div>

          <nav className="hidden sm:flex align-middle">
            <ul className="flex flex-row gap-12 text-black font-bold text-xl">
              <li className="cursor-pointer" onClick={scrollToTop}>
                Головна
              </li>
              <li className="cursor-pointer" onClick={scrollToBottom}>
                Контакти
              </li>
            </ul>
          </nav>

          {isMenuOpen && (
            <>
              <div className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-40"></div>
              <div className="fixed inset-0 right-8 bg-white">
                <nav className="sm:hidden absolute top-0 left-0 w-full h-full flex flex-col ">
                  <ul className="flex flex-col gap-6 px-4 py-20 text-black font-bold text-xl">
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        scrollToTop();
                        handleMenuClick();
                      }}
                    >
                      Головна
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        scrollToBottom();
                        handleMenuClick();
                      }}
                    >
                      Контакти
                    </li>
                  </ul>
                </nav>
                <button
                  className="absolute top-5 right-5 mt-4 mr-4 w-6 h-6"
                  onClick={handleMenuClick}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 1L1 25M1 1L25 25"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
          <button className="w-[120px] h-[40px] bg-[#9142C4] hover:bg-[#7613B5] text-white py-2 px-4 rounded-full font-semibold text-xs">
            Замовити
          </button>
        </div>
      </ComponentContainer>
    </header>
  );
};
