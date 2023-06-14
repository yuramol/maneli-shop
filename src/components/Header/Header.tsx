import { useEffect, useState } from 'react';

import { ComponentContainer } from '@/layouts';
import { Logo, BurgerButton } from '@/legos';
import { Nav } from './Nav';
import { Button } from '@/legos/Button';
import { IconButton } from '@/legos/Button/IconButton';
import { useRouter } from 'next/router';
import { useProductQuery } from '@/graphql/queries/__generated__/product';
import { OrderForm } from '../OrderForm';

export const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { query, isReady } = useRouter();
  const [xsScreen, setXsScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useProductQuery({
    variables: {
      id: query.id as string,
    },
    skip: !isReady,
    fetchPolicy: 'network-only',
  });
  const product = data?.product?.data;

  useEffect(() => {
    const updateSize = () => {
      setXsScreen(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMenuClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const toggleOrderForm = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <>
      <header className="sticky z-50 top-0 h-16 sm:h-24 flex items-center justify-between bg-[#E6E6E6] border-b-[1px] border-b-[#D5D2F2] border-b-solid">
        <ComponentContainer>
          <div className="flex justify-between">
            <div className="flex gap-4">
              {xsScreen ? <IconButton icon="Burger" onClick={handleMenuClick} /> : null}
              <Logo />
            </div>
            <Nav handleMenuClick={handleMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />

            {query.id && <Button title="Замовити" color="#7613B5" onClick={toggleOrderForm} />}
          </div>
        </ComponentContainer>
      </header>
      {!!product && (
        <OrderForm
          productData={product}
          productId={query.id as string}
          isOpen={isOpen}
          toggleForm={toggleOrderForm}
        />
      )}
    </>
  );
};
