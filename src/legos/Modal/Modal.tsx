import { FC, MouseEvent, ReactNode, TouchEvent, useRef, useState } from 'react';
import { IconButton } from '@/legos';

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
  children: ReactNode;
};

export const Modal: FC<Props> = ({ isOpen, toggleModal, children }) => {
  const modalWrapRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(0);

  const handelTouchStart = (e: TouchEvent) => {
    setTouchStartY(e.changedTouches[0].clientY);
  };

  const handelTouchEnd = (e: TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (deltaY > 200) {
      toggleModal();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalWrapRef.current === e.target) {
      toggleModal();
    }
  };

  return (
    <div
      ref={modalWrapRef}
      onTouchStart={handelTouchStart}
      onTouchEnd={handelTouchEnd}
      onClick={handleClickOutside}
      className={`fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-end transition-all duration-300 ease-in sm:items-center${
        !isOpen ? ' opacity-0 pointer-events-none invisible' : ''
      }`}
    >
      <div
        className={`relative overflow-auto max-w-[660px] sm:max-h-[100vh] rounded-t-3xl transition-all duration-200 ease-in py-4 md:py-10 sm:w-5/6 md:w-4/6 xl:w-3/6 sm:rounded-2xl bg-white before:sm:hidden before:absolute before:w-20 before:h-1 before:top-2 before:left-1/2 before:-ml-10 before:rounded-xl before:bg-[#2E0F42] ${
          isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-96'
        }`}
      >
        <IconButton
          className="absolute top-5 right-5 md:top-12 md:right-12 hidden sm:block"
          icon="Close"
          onClick={toggleModal}
        />
        <div className="px-4 md:px-10 overflow-y-auto h-full scrollbar-hide">{children}</div>
      </div>
    </div>
  );
};
