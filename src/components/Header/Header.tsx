import { useLayoutEffect, useState } from 'react';

import { ComponentContainer } from '@/layouts';
import { Logo, BurgerButton } from '@/legos';
import { Nav } from './Nav';

export const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [xsScreen, setXsScreen] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setXsScreen(window.innerWidth > 640);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMenuClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <header className="sticky top-0 h-16 sm:h-24 flex items-center justify-between bg-[#E6E6E6] border-b-[1px] border-b-[#D5D2F2] border-b-solid">
      <ComponentContainer>
        <div className="flex justify-between">
          <div className="flex gap-4">
            {!xsScreen ? <BurgerButton onClick={handleMenuClick} /> : null}
            <Logo />
          </div>
          <Nav
            handleMenuClick={handleMenuClick}
            isBurgerMenuOpen={isBurgerMenuOpen}
          />
          <button className="w-[120px] h-[40px] bg-[#9142C4] hover:bg-[#7613B5] text-white py-2 px-4 rounded-full font-semibold text-xs">
            Замовити
          </button>
        </div>
      </ComponentContainer>
    </header>
  );
};
