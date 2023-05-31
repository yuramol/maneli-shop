import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import dynamic from 'next/dynamic';

import {
  CountdownTimer,
  OrderForm,
  ProductCharacteristicItem,
  ProductOptionCard,
} from '@/components';
import { ComponentContainer, MainLayout } from '@/layouts';
import { DiscountLabel, Icon, IconButton, Rate } from '@/legos';

import { useProductQuery } from '@/graphql/queries/__generated__/product';

import productImage21 from '../../assets/rectangle-21.png';
import productImage from '../../assets/rectangle-25.png';
import review from '../../assets/review.png';

export default function Product() {
  const { query } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading, error } = useProductQuery({
    variables: {
      id: query.id as string,
    },
  });

  const product = data?.product?.data;

  const toggleOrderForm = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

  return (
    <MainLayout>
      <ComponentContainer>
        <section className="relative grid md:grid-cols-2 gap-11 items-center mt-4 md:mt-20 before:w-[400px] before:h-[400px] before:absolute before:-top-20 before:-left-44 before:bg-radial-gradient-purple before:opacity-10 before:-z-10 after:w-[400px] after:h-[400px] after:absolute after:-bottom-20 after:-right-44 after:bg-radial-gradient-purple after:opacity-10 after:-z-10">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="font-bold text-2xl md:text-5xl">{product?.attributes?.title}</h1>
            <p className="text-sm md:text-lg">{product?.attributes?.description}</p>
            {product?.attributes?.imagePreview?.data?.attributes?.url && (
              <div className="relative flex md:hidden overflow-hidden rounded-2xl">
                <DiscountLabel discount={product?.attributes?.discount ?? 0} />
                <Image
                  alt={
                    product.attributes.imagePreview.data?.attributes?.alternativeText ??
                    product.attributes.title ??
                    'Фото продукту'
                  }
                  src={process.env.BASE_URL + product.attributes.imagePreview.data?.attributes?.url}
                  width={product.attributes.imagePreview.data?.attributes?.width}
                  height={product.attributes.imagePreview.data?.attributes?.height}
                  priority
                />
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-baseline gap-2">
                <p className="text-[#F6543E] font-bold text-4xl">
                  🔥{' '}
                  {(product?.attributes?.price ?? 0) *
                    (1 - (product?.attributes?.discount ?? 0) / 100)}{' '}
                  грн
                </p>
                <p className="text-[#828282] line-through">{product?.attributes?.price} грн</p>
              </div>
              <Rate rate={product?.attributes?.rating ?? 4.8} />
            </div>
            <CountdownTimer />
            <button
              onClick={toggleOrderForm}
              className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold p-4 w-full md:w-80"
            >
              Замовити зараз
            </button>
          </div>
          {product?.attributes?.imagePreview?.data?.attributes && (
            <div className="relative hidden md:flex overflow-hidden rounded-2xl">
              <DiscountLabel discount={product?.attributes?.discount ?? 0} />
              <Image
                alt={
                  product.attributes.imagePreview.data?.attributes?.alternativeText ??
                  product.attributes.title ??
                  'Фото продукту'
                }
                src={process.env.BASE_URL + product.attributes.imagePreview.data?.attributes?.url}
                width={product.attributes.imagePreview.data?.attributes?.width as number}
                height={product.attributes.imagePreview.data?.attributes?.height as number}
                priority
              />
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-8 md:gap-11 md:mt-20">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#F4F3FD]">
            <h2 className="font-bold text-2xl md:text-5xl">Докладний опис</h2>
            {!!product?.attributes?.productTableDescriptions?.length && (
              <dl className="mt-4 sm:mt-7">
                {product?.attributes?.productTableDescriptions?.map(
                  item =>
                    item?.text && (
                      <ProductCharacteristicItem
                        key={item.id}
                        title={item.text}
                        value={item.value}
                      />
                    ),
                )}
              </dl>
            )}
          </div>
          {product?.attributes?.video && (
            <ReactPlayer url={product?.attributes?.video} controls width="100%" />
          )}
        </section>

        <button
          onClick={toggleOrderForm}
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
          onClick={toggleOrderForm}
          className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold p-4 w-full mx-auto my-8 md:my-20 md:w-80"
        >
          Замовити зараз
        </button>

        <OrderForm isOpen={isOpen} toggleForm={toggleOrderForm} />
      </ComponentContainer>
    </MainLayout>
  );
}
