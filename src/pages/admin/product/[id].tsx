import { useState } from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { getToken } from 'next-auth/jwt';
import { GetServerSideProps } from 'next/types';
import Image from 'next/legacy/image';
import dynamic from 'next/dynamic';

import {
  CountdownTimer,
  AddEditProductTableDescriptionForm,
  ProductCharacteristicItem,
  ProductOptionCard,
  AddProductForm,
  AddEditProductVideoForm,
} from '@/components';
import { ComponentContainer } from '@/layouts';
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CalendarDate,
  CreditCardShield,
  DiscountLabel,
  Edit,
  IconButton,
  Plus,
  Rate,
  Scales,
  ShieldTick,
} from '@/legos';

import { ProductDocument, useProductQuery } from '@/graphql/queries/__generated__/product';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { TableDescriptionFields } from '@/components/AddEditProductTableDescriptionForm/types';

import productImage21 from '../../../assets/rectangle-21.png';
import review from '../../../assets/review.png';

export default function Product() {
  const { query } = useRouter();
  const { data, loading, error } = useProductQuery({
    variables: {
      id: query.id as string,
    },
  });
  const [updateProductMutation] = useUpdateProductMutation();

  const product = data?.product?.data;

  const [isOpenAddProductForm, setIsOpenAddProductForm] = useState(false);
  const [isOpenTableDescriptionForm, setIsOpenTableDescriptionForm] = useState(false);
  const [editTableDescriptionID, setEditTableDescriptionID] = useState<string | undefined>(
    undefined,
  );

  const toggleAddProductForm = () => {
    setIsOpenAddProductForm(isOpen => !isOpen);
  };

  const toggleTableDescriptionForm = (id?: string) => {
    setEditTableDescriptionID(id);
    setIsOpenTableDescriptionForm(isOpen => !isOpen);
  };

  const [isOpenProductVideoForm, setIsOpenProductVideoForm] = useState(false);

  const toggleProductVideoForm = () => {
    setIsOpenProductVideoForm(isOpen => !isOpen);
  };

  const handleDeleteProductTableDescription = (id: string) => {
    const data = {
      productTableDescriptions: [
        ...(product?.attributes?.productTableDescriptions
          ?.filter(item => item?.id !== id)
          .map(item => ({
            [TableDescriptionFields.ID]: item?.[TableDescriptionFields.ID],
            [TableDescriptionFields.Text]: item?.[TableDescriptionFields.Text],
            [TableDescriptionFields.Value]: item?.[TableDescriptionFields.Value],
          })) ?? []),
      ],
    };

    updateProductMutation({
      variables: { id: query.id as string, data },
      refetchQueries: [ProductDocument],
    });
  };

  const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

  return (
    <AdminLayout>
      <ComponentContainer>
        <section className="relative grid md:grid-cols-2 gap-11 items-center mt-4 md:mt-20 before:w-[400px] before:h-[400px] before:absolute before:-top-20 before:-left-44 before:bg-radial-gradient-purple before:opacity-10 before:-z-10 after:w-[400px] after:h-[400px] after:absolute after:-bottom-20 after:-right-44 after:bg-radial-gradient-purple after:opacity-10 after:-z-10">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl md:text-5xl">{product?.attributes?.title}</h1>
              <IconButton
                onClick={toggleAddProductForm}
                icon="Edit"
                className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-purple-700"
              />
            </div>
            <p className="text-sm md:text-lg">{product?.attributes?.description}</p>
            {product?.attributes?.imagePreview?.data?.attributes?.formats?.large?.url && (
              <div className="relative flex md:hidden overflow-hidden rounded-2xl">
                <DiscountLabel discount={product?.attributes?.discount ?? 0} />
                <Image
                  alt={
                    product.attributes.imagePreview.data?.attributes?.alternativeText ??
                    product.attributes.title ??
                    'Фото продукту'
                  }
                  src={
                    process.env.BASE_URL +
                    product.attributes.imagePreview.data?.attributes?.formats?.large?.url
                  }
                  width={product.attributes.imagePreview.data?.attributes?.formats?.large?.width}
                  height={product.attributes.imagePreview.data?.attributes?.formats?.large?.height}
                  priority
                />
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-end gap-2">
                <p className="text-[#F6543E] font-bold text-4xl">
                  🔥{' '}
                  {(product?.attributes?.price ?? 0) *
                    (1 - (product?.attributes?.discount ?? 0) / 100)}{' '}
                  грн
                </p>
                <p className="text-[#828282] text-base line-through">
                  {product?.attributes?.price} грн
                </p>
              </div>
              <Rate rate={product?.attributes?.rating ?? 4.8} />
            </div>
            <CountdownTimer />
          </div>
          {product?.attributes?.imagePreview?.data?.attributes?.formats?.large?.url && (
            <div className="relative hidden md:flex overflow-hidden rounded-2xl">
              <DiscountLabel discount={product?.attributes?.discount ?? 0} />
              <Image
                alt={
                  product.attributes.imagePreview.data.attributes.alternativeText ??
                  product.attributes.title ??
                  'Фото продукту'
                }
                src={
                  process.env.BASE_URL +
                  product.attributes.imagePreview.data.attributes.formats.large.url
                }
                width={product.attributes.imagePreview.data.attributes.formats.large.width}
                height={product.attributes.imagePreview.data.attributes.formats.large.height}
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
                      <div key={item.id} className="flex justify-between items-center mb-2 sm:mb-4">
                        <ProductCharacteristicItem title={item.text} value={item.value} />
                        <div className="flex gap-2">
                          <IconButton
                            onClick={() => toggleTableDescriptionForm(item.id)}
                            icon="Edit"
                            className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-purple-700"
                          />
                          <IconButton
                            icon="Delete"
                            className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-red-500"
                            onClick={() => handleDeleteProductTableDescription(item.id)}
                          />
                        </div>
                      </div>
                    ),
                )}
              </dl>
            )}
            {!isOpenTableDescriptionForm && (
              <button
                onClick={() => toggleTableDescriptionForm()}
                className="flex justify-center items-center gap-2 rounded-full border border-black text-sm font-semibold px-6 py-3 transition-all duration-200 hover:text-[#7613B5] hover:border-[#7613B5]"
              >
                <Plus />
                Додати опис
              </button>
            )}
          </div>
          <div className="relative flex">
            {product?.attributes?.video ? (
              <>
                <ReactPlayer url={product?.attributes?.video} controls width="100%" />
                <button
                  onClick={toggleProductVideoForm}
                  className="absolute -top-14 flex justify-center items-center gap-2 rounded-full border border-black text-sm font-semibold px-6 py-3 transition-all duration-200 hover:text-[#7613B5] hover:border-[#7613B5]"
                >
                  <Edit />
                  Редагувати відеопосилання
                </button>
              </>
            ) : (
              !isOpenTableDescriptionForm && (
                <button
                  onClick={toggleProductVideoForm}
                  className="flex m-auto justify-center items-center gap-2 rounded-full border border-black text-sm font-semibold px-6 py-3 transition-all duration-200 hover:text-[#7613B5] hover:border-[#7613B5]"
                >
                  <Plus />
                  Додати відео
                </button>
              )
            )}
          </div>
        </section>

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

        <AddProductForm
          isOpen={isOpenAddProductForm}
          toggleForm={toggleAddProductForm}
          product={product}
        />

        <AddEditProductTableDescriptionForm
          isOpen={isOpenTableDescriptionForm}
          toggleForm={toggleTableDescriptionForm}
          editTableDescriptionID={editTableDescriptionID}
          productTableDescriptions={product?.attributes?.productTableDescriptions}
        />

        <AddEditProductVideoForm
          isOpen={isOpenProductVideoForm}
          toggleForm={toggleProductVideoForm}
          productVideo={product?.attributes?.video}
        />
      </ComponentContainer>
    </AdminLayout>
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
