import { useLayoutEffect, useState } from 'react';

import { ComponentContainer } from '@/layouts';
import { Logo, BurgerButton } from '@/legos';
import { Nav } from './Nav';
import { Button } from '@/legos/Button';
import { IconButton } from '@/legos/Button/IconButton';

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
    <header className=" z-[1000] sticky top-0 h-16 sm:h-24 flex items-center justify-between bg-[#E6E6E6] border-b-[1px] border-b-[#D5D2F2] border-b-solid">
      <ComponentContainer>
        <div className="flex justify-between">
          <div className="flex gap-4">
            {!xsScreen ? <IconButton icon="Burger" onClick={handleMenuClick} /> : null}
            <Logo />
          </div>
          <Nav handleMenuClick={handleMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />

          <Button title="Замовити" color="#7613B5" />
        </div>
      </ComponentContainer>
    </header>
  );
};
