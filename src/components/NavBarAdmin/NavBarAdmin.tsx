import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { Button, Logo } from '@/legos';
import { IconButton } from '@/legos/Button/IconButton';

export const NavBarAdmin = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col justify-between h-screen p-3 bg-white shadow w-72">
      <div className="space-y-3">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <Link href="/admin">Продукти</Link>
            </li>
          </ul>
        </div>
      </div>
      <Button
        className="mx-auto"
        title="Вийти"
        color="#7613B5"
        onClick={async () => {
          const data = await signOut({
            redirect: false,
            callbackUrl: '/',
          });
          push(data.url);
        }}
      />
    </div>
  );
};
