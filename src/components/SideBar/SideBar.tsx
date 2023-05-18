import { FC, ReactNode, useEffect, useState } from 'react';

import { NavBarAdmin } from '../NavBarAdmin';
import { Button, Logo } from '@/legos';
import { IconButton } from '@/legos/Button/IconButton';

export const SideBar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [xsScreen, setXsScreen] = useState(false);

  useEffect(() => {
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

  return xsScreen ? (
    <NavBarAdmin />
  ) : (
    <>
      {!isBurgerMenuOpen && (
        <div className="flex gap-4 p-4">
          <IconButton icon="Burger" onClick={handleMenuClick} />
          <Logo />
        </div>
      )}
      <div
        className={
          'flex fixed top-0 left-0 z-20 w-[90%] h-full transition-all duration-500 transform -translate-x-full ' +
          (isBurgerMenuOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex w-full justify-between  bg-white">
          <NavBarAdmin />
          <IconButton className="mt-7 mr-7 w-6 h-6" icon="Close" onClick={handleMenuClick} />
        </div>
      </div>
      {isBurgerMenuOpen && (
        <div className="flex fixed top-0 left-0 h-full w-full z-19 bg-black opacity-40" />
      )}
    </>
  );
};
