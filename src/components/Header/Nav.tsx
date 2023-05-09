import { useLayoutEffect, useState } from 'react';

export const Nav = ({
  isBurgerMenuOpen,
  handleMenuClick,
}: {
  isBurgerMenuOpen: boolean;
  handleMenuClick: () => void;
}) => {
  const [xsScreen, setXsScreen] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setXsScreen(window.innerWidth > 640);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

  return xsScreen ? (
    <nav className="flex align-middle">
      <ul className="flex flex-row gap-12 font-bold text-xl">
        <li className="cursor-pointer" onClick={scrollToTop}>
          Головна
        </li>
        <li className="cursor-pointer" onClick={scrollToBottom}>
          Контакти
        </li>
      </ul>
    </nav>
  ) : (
    <>
      <div
        className={
          'flex fixed top-0 left-0 z-20 w-[90%] h-full transition-all duration-500 transform -translate-x-full ' +
          (isBurgerMenuOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex w-full justify-between  bg-white">
          <nav className="flex">
            <ul className="flex flex-col gap-6 px-4 py-20 font-bold text-xl">
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
          <button className="mt-7 mr-7 w-6 h-6" onClick={handleMenuClick}>
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {isBurgerMenuOpen && (
        <div className="flex fixed top-0 left-0 h-full w-full z-19 bg-black opacity-40" />
      )}
    </>
  );
};
