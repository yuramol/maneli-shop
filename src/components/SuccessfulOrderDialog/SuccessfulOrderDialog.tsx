import { FC } from 'react';

import Image from 'next/legacy/image';

import { Icon, Modal } from '@/legos';

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
};
export const SuccessfulOrderDialog: FC<Props> = ({ isOpen, toggleModal }) => {
  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal}>
      <h2 className="font-bold text-xl mb-6 mt-3 sm:mt-0 md:text-3xl ">Ваше замовлення:</h2>
      <div className="flex justify-center items-center flex-col py-10">
        <Icon icon="Successful" />
        <div className="flex justify-center items-center flex-col py-9 max-w-[456px]">
          <p className="text-[20px] font-bold text-center sm:text-[32px]">Дякуємо.</p>
          <p className="text-[20px] font-bold text-center sm:text-[32px]">Замовлення прийнято!</p>
          <p className="text-[20px] font-bold text-center sm:text-[32px]">
            Ми звʼяжемося з вами найближчим часом.
          </p>
        </div>
      </div>
    </Modal>
  );
};
