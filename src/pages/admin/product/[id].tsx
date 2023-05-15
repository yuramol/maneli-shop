import { useRouter } from 'next/router';
import Image from 'next/legacy/image';

import { ProductOptionCard } from '@/components';
import { ComponentContainer, MainLayout } from '@/layouts';
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CalendarDate,
  CreditCardShield,
  DiscountLabel,
  Rate,
  Scales,
  ShieldTick,
} from '@/legos';

import productImage21 from '../../../assets/rectangle-21.png';
import productImage from '../../../assets/rectangle-25.png';
import review from '../../../assets/review.png';

export default function Product() {
  const { query } = useRouter();

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
          <div className="hidden relative md:flex">
            <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-10">
              <DiscountLabel discount={40} />
            </div>
            <Image src={productImage} alt="Product photo" />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-8 md:gap-11 md:mt-20">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#F4F3FD]">
            <h2 className="font-bold text-2xl md:text-5xl">Докладний опис</h2>
            <dl className="mt-4 sm:mt-7">
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Матеріал:</dt>
                <dd>Пластик</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Розмір:</dt>
                <dd>92 * 58mm</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Напруга:</dt>
                <dd>5V</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Потужність:</dt>
                <dd>3Вт / 5Вт / 7Вт</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Джерело живлення:</dt>
                <dd>120-мм лінія живлення USB (в т.ч.)</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Чіп:</dt>
                <dd>5730</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Тривалість життя:</dt>
                <dd>50000H</dd>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg mb-2 sm:mb-6">
                <dt className="font-semibold">Підходить для всіх USB-розємів</dt>
              </span>
              <span className="flex flex-row gap-1 text-sm sm:text-lg">
                <dt className="font-semibold">Постачання живлення від USB</dt>
              </span>
            </dl>
          </div>
          <Image src={productImage} alt="Product photo" />
        </section>

        <button className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold h-16 w-full mt-8 md:w-80 md:hidden">
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
              <button>
                <ArrowCircleLeft />
              </button>
              <button>
                <ArrowCircleRight />
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-8 md:mt-16">
            <div className="flex sm:w-2/4">
              <Image src={review} alt="Review photo" />
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-4 sm:gap-10 justify-center mt-8 md:mt-20">
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <CalendarDate />
              <p className="font-semibold">Доставка 1-3 дні</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <CreditCardShield />
              <p className="font-semibold">Оплата при отримані</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <Scales />
              <p className="font-semibold">Вигідна ціна</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-40 text-center rounded-2xl p-8 bg-[#F4F3FD]">
              <ShieldTick />
              <p className="font-semibold">Гарантія якості</p>
            </div>
          </div>
        </section>

        <button className="flex justify-center items-center rounded-full bg-[#7613B5] text-white text-base font-semibold h-16 w-full mx-auto my-8 md:my-20 md:w-80">
          Замовити зараз
        </button>
      </ComponentContainer>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};