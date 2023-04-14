import Image from 'next/legacy/image';
import Link from 'next/link';

import logo from '../../assets/Logo.svg';
import { useLayoutEffect, useState } from 'react';

export const Logo = () => {
  const [isXsScreen, setIsXsScreen] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsXsScreen(window.innerWidth > 640);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Link href="/" className="flex items-center">
      <div className="w-14 sm:w-[100px] h-5 sm:h-9">
        <Image
          alt="logo"
          width={isXsScreen ? 100 : 56}
          height={isXsScreen ? 36 : 30}
          src={logo}
          objectFit="contain"
        />
      </div>
    </Link>
  );
};
