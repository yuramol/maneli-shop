import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { ComponentContainer } from '@/layouts';
import { Button, Login, Logo } from '@/legos';
import { IconButton } from '@/legos/Button/IconButton';
import { getAccessToken } from '@/helpers/getAccessToken';
import { useRouter } from 'next/router';

export const Footer = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <footer className="bg-[#F4F3FD]">
      <ComponentContainer>
        <div id="footer-contact-container" className="relative flex justify-start py-8 sm:py-10">
          <div>
            <h1 className="mb-3 sm:mb-10 font-bold text-2xl sm:text-[42px] sm:leading-[54px] tracking-[0.01rem]">
              Контакти
            </h1>
            <p className="mb-3 font-semibold text-sm sm:text-base">manko@gmail.com</p>
            <p className="mb-5 sm:mb-8 font-semibold text-sm sm:text-base">+ 38 063 76 75 891</p>
            <p className="font-bold text-xs tracking-[0.02rem]">
              Манелі – інтернет магазин популярних товарів
            </p>

            <Link href={session?.user ? '/admin' : '/login'} className="flex p-3 w-12">
              <Login color="#7613B5" />
            </Link>
          </div>
          <div className="absolute right-0 pt-1 sm:pt-6">
            <Logo />
          </div>
        </div>
      </ComponentContainer>
    </footer>
  );
};
