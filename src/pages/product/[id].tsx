import { useRouter } from 'next/router';
import Image from 'next/legacy/image';

import { ComponentContainer, MainLayout } from '@/layouts';
import { DiscountLabel, Rate } from '@/legos';

import productImage from '../../assets/rectangle-25.png';

export default function Product() {
  const { query } = useRouter();

  return (
    <MainLayout>
      <ComponentContainer>
        <section className="relative grid md:grid-cols-2 gap-11 items-center mt-4 md:mt-20 before:w-[400px] before:h-[400px] before:absolute before:-top-20 before:-left-44 before:bg-radial-gradient-purple before:opacity-10 before:-z-10 after:w-[400px] after:h-[400px] after:absolute after:-bottom-20 after:-right-44 after:bg-radial-gradient-purple after:opacity-10 after:-z-10">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="font-bold text-2xl md:text-5xl">
              Портативна світлодіодна USB лампа
            </h1>
            <p className="text-sm md:text-lg">
              Зручна портативна світлодіодна лампа USB. Підійде для походів,
              кемпінгу, наметів, подорожей, роботи з блокнотом. Живлення
              здійснюється від power bank.
            </p>
            <div className="relative h-full md:hidden">
              <div className="absolute right-2 sm:right-6 top-2 sm:top-6 z-10">
                <DiscountLabel discount={40} />
              </div>
              <Image src={productImage} alt="Product photo" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-end gap-2">
                <p className="text-[#F6543E] font-bold text-4xl">
                  🔥 {`${270 * (1 - 40 / 100)} грн`}
                </p>
                <p className="text-[#828282] text-base line-through">{`${270} грн`}</p>
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
            <button className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold h-16 w-full md:w-80">
              Замовити зараз
            </button>
          </div>
          <div className="hidden relative h-full md:block">
            <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-10">
              <DiscountLabel discount={40} />
            </div>
            <Image src={productImage} alt="Product photo" />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-11 mt-4 md:mt-20">
          <div className="rounded-2xl p-8 bg-[#F4F3FD]">
            <h2 className="font-bold text-2xl md:text-5xl">Докладний опис</h2>
            <dl className="">
              <span className="flex flex-row gap-1 text-lg">
                <dt className="font-semibold">Матеріал:</dt>
                <dd>Пластик</dd>
              </span>
              <span className="flex flex-row gap-1 text-lg">
                <dt className="font-semibold">Розмір:</dt>
                <dd>92 * 58mm</dd>
              </span>
              <span className="flex flex-row gap-1 text-lg">
                <dt className="font-semibold">Напруга:</dt>
                <dd>5V</dd>
              </span>
              <span className="flex flex-row gap-1 text-lg">
                <dt className="font-semibold">Потужність:</dt>
                <dd>3Вт / 5Вт / 7Вт</dd>
              </span>
            </dl>
          </div>
          <div className="h-full">
            <Image src={productImage} alt="Product photo" />
          </div>
        </section>
      </ComponentContainer>
    </MainLayout>
  );
}
