import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormikContext, useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/legacy/image';

import { OrderForm, ProductOptionCard } from '@/components';
import { ComponentContainer, MainLayout } from '@/layouts';
import { DiscountLabel, Icon, IconButton, Modal, Rate } from '@/legos';

import productImage21 from '../../assets/rectangle-21.png';
import productImage from '../../assets/rectangle-25.png';
import review from '../../assets/review.png';
import { ProductCharacteristicItem } from '@/components/ProductDescriptionItem';
import { OrderUserFields, colorOptions, modelOptions } from '@/components/OrderForm';
import { AddProductForm } from '@/components/AddProductForm';
import { AddProductFields } from '@/components/AddProductForm/types';

const CHARACTERISTICS = [
  {
    title: 'Матеріал',
    text: 'Пластик',
  },
  {
    title: 'Матеріал',
    text: 'Пластик',
  },
  {
    title: 'Матеріал',
    text: 'Пластик',
  },
  {
    title: 'Матеріал',
    text: 'Пластик',
  },
];

export default function Product() {
  const { query } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // const initialValues = {
  //   [OrderUserFields.Quantity]: 1,
  //   [OrderUserFields.Name]: '',
  //   [OrderUserFields.Phone]: '',
  //   [OrderUserFields.Color]: colorOptions[0].value ?? '',
  //   [OrderUserFields.Model]: modelOptions[0].value ?? '',
  // };

  const initialValues = {
    [AddProductFields.Title]: '',
    [AddProductFields.Description]: '',
    [AddProductFields.Discount]: 40,
    [AddProductFields.Price]: 0,
  };

  const phoneRegExp = /^(\+380|0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const validationSchema = yup.object({
    [OrderUserFields.Name]: yup.string().required('Будь ласка, заповніть дане поле'),
    [OrderUserFields.Phone]: yup
      .string()
      .required('Будь ласка, заповніть дане поле')
      .matches(phoneRegExp, 'Будь ласка, вкажіть коректно телефон'),
  });

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  const toggleModal = () => {
    formik.resetForm();
    setIsOpen(open => !open);
  };

  return (
    <MainLayout>
      <ComponentContainer>
        <section className="relative grid md:grid-cols-2 gap-11 items-center mt-4 md:mt-20 before:w-[400px] before:h-[400px] before:absolute before:-top-20 before:-left-44 before:bg-radial-gradient-purple before:opacity-10 before:-z-10 after:w-[400px] after:h-[400px] after:absolute after:-bottom-20 after:-right-44 after:bg-radial-gradient-purple after:opacity-10 after:-z-10">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="font-bold text-2xl md:text-5xl">Портативна світлодіодна USB лампа</h1>
            <p className="text-sm md:text-lg">
              Зручна портативна світлодіодна лампа USB. Підійде для походів, кемпінгу, наметів,
              подорожей, роботи з блокнотом. Живлення здійснюється від power bank.
            </p>
            <div className="flex relative md:hidden">
              <div className="absolute right-2 sm:right-6 top-2 sm:top-6 z-10">
                <DiscountLabel discount={40} />
              </div>
              <Image src={productImage} alt="Product photo" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-baseline gap-2">
                <p className="text-[#F6543E] font-bold text-4xl">
                  🔥 {`${270 * (1 - 40 / 100)} грн`}
                </p>
                <p className="text-[#828282] line-through">270 грн</p>
              </div>
              <Rate rate={4.8} />
            </div>
            <div className="font-bold text-sm md:text-2xl">
              <p className="mb-4">До кінця акції:</p>
              <ul className="grid grid-cols-3 rounded-md p-4 bg-[#F4F3FD]">
                <li className="flex flex-col items-center relative after:content-[':'] after:absolute after:-right-1">
                  <span>22</span>
                  <span>годин</span>
                </li>
                <li className="flex flex-col items-center relative after:content-[':'] after:absolute after:-right-1">
                  <span>16</span>
                  <span>хвилин</span>
                </li>
                <li className="flex flex-col items-center">
                  <span>22</span>
                  <span>секунд</span>
                </li>
              </ul>
            </div>
            <button
              onClick={toggleModal}
              className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold p-4 w-full md:w-80"
            >
              Замовити зараз
            </button>
          </div>
          <div className="hidden relative md:flex overflow-hidden rounded-2xl">
            <DiscountLabel discount={40} />
            <Image src={productImage} alt="Product photo" />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-8 md:gap-11 md:mt-20">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#F4F3FD]">
            <h2 className="font-bold text-2xl md:text-5xl">Докладний опис</h2>
            <dl className="mt-4 sm:mt-7">
              {CHARACTERISTICS.map((item, index) =>
                item?.title ? (
                  <ProductCharacteristicItem
                    key={`${item.title}-${index}`}
                    title={item.title}
                    text={item.text}
                  />
                ) : null,
              )}
            </dl>
          </div>
          <Image src={productImage} alt="Product photo" />
        </section>

        <button
          onClick={toggleModal}
          className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold p-4 w-full mt-8 md:w-80 md:hidden"
        >
          Замовити зараз
        </button>

        <section className="mt-8 md:mt-12">
          <h2 className="font-bold text-2xl md:text-5xl">Варіанти користування</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-8 md:gap-11 md:mt-10">
            <ProductOptionCard
              title="Вимкнення світла"
              text="Світлодіодна лампа випромінює яскраве світло, тому її зручно
                  використовувати під час виключень електроенергії."
              src={productImage21}
            />
            <ProductOptionCard
              title="Кемпінг"
              text="Оскільки лампа має малі габарити, нею без проблем можна освтлювати в палатаці."
              src={productImage21}
            />
            <ProductOptionCard
              title="Подорожі"
              text="Led лампа має низьке енергоспоживання та працює від power bank, тому її зручно брати в подорожі."
              src={productImage21}
            />
            <ProductOptionCard
              title="Вимкнення світла"
              text="Світлодіодна лампа випромінює яскраве світло, тому її зручно
                  використовувати під час виключень електроенергії."
              src={productImage21}
            />
          </div>
        </section>

        <section className="mt-8 md:mt-12">
          <div className="flex flex-row gap-6 justify-between items-center">
            <h2 className="font-bold text-2xl md:text-5xl">Відгуки</h2>
            <div className="flex flex-row gap-6 md:gap-10">
              <IconButton icon="ArrowCircleLeft" />
              <IconButton icon="ArrowCircleRight" />
            </div>
          </div>
          <div className="flex justify-center mt-8 md:mt-16">
            <div className="flex sm:w-2/4">
              <Image src={review} alt="Review photo" />
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-4 sm:gap-10 justify-center mt-8 md:mt-20">
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <Icon icon="CalendarDate" />
              <p className="font-semibold">Доставка 1-3 дні</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <Icon icon="CreditCardShield" />
              <p className="font-semibold">Оплата при отримані</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <Icon icon="Scales" />
              <p className="font-semibold">Вигідна ціна</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <Icon icon="ShieldTick" />
              <p className="font-semibold">Гарантія якості</p>
            </div>
          </div>
        </section>

        <button
          onClick={toggleModal}
          className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold p-4 w-full mx-auto my-8 md:my-20 md:w-80"
        >
          Замовити зараз
        </button>

        <FormikContext.Provider value={formik}>
          <Modal isOpen={isOpen} toggleModal={toggleModal}>
            {/* <OrderForm /> */}
            <AddProductForm toggleModal={toggleModal} />
          </Modal>
        </FormikContext.Provider>
      </ComponentContainer>
    </MainLayout>
  );
}
