import { IconButton } from '@/legos/Button/IconButton';
import { useEffect, useState } from 'react';

export const Nav = ({
  isBurgerMenuOpen,
  handleMenuClick,
}: {
  isBurgerMenuOpen: boolean;
  handleMenuClick: () => void;
}) => {
  const [xsScreen, setXsScreen] = useState(false);

  useEffect(() => {
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
    <nav className="flex">
      <ul className="flex items-center flex-row gap-12 font-bold text-xl">
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
          'flex fixed z-10 top-0 left-0 w-[90%] h-full transition-all duration-500 transform -translate-x-full ' +
          (isBurgerMenuOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex w-full justify-between bg-white">
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
          <IconButton className="mt-7 mr-7 w-6 h-6" icon="Close" onClick={handleMenuClick} />
        </div>
      </div>
      {isBurgerMenuOpen && (
        <div className="flex fixed top-0 left-0 h-full w-full bg-black opacity-40" />
      )}
    </>
  );
};
