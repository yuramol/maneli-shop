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
  AddEditProductDescriptionForm,
} from '@/components';
import { ComponentContainer } from '@/layouts';
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  DiscountLabel,
  Edit,
  IconButton,
  Plus,
  Rate,
} from '@/legos';

import { ProductDocument, useProductQuery } from '@/graphql/queries/__generated__/product';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { TableDescriptionFields } from '@/components/AddEditProductTableDescriptionForm/types';

import review from '../../../assets/review.png';
import { DescriptionFields } from '@/components/AddEditProductDescriptionForm/types';
import { ProductEntity, UploadFile } from '@/__generated__/types';

export default function Product() {
  const { query } = useRouter();
  const { data, loading, error } = useProductQuery({
    variables: {
      id: query.id as string,
    },
  });
  const [updateProductMutation] = useUpdateProductMutation();

  const product = data?.product?.data as ProductEntity;

  const [isOpenAddProductForm, setIsOpenAddProductForm] = useState(false);
  const [isOpenTableDescriptionForm, setIsOpenTableDescriptionForm] = useState(false);
  const [editTableDescriptionID, setEditTableDescriptionID] = useState<string | undefined>(
    undefined,
  );

  const [isOpenProductDescriptionForm, setIsOpenProductDescriptionForm] = useState(false);
  const [editProductDescriptionID, setEditProductDescriptionID] = useState<string | undefined>(
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

  const toggleProductDescriptionForm = (id?: string) => {
    setEditProductDescriptionID(id);
    setIsOpenProductDescriptionForm(isOpen => !isOpen);
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

  const handleDeleteProductPostDescription = (id: string) => {
    const data = {
      productDescriptions: [
        ...(product?.attributes?.productDescriptions?.map(item => ({
          id: item?.id,
          title: item?.title,
          productDescriptionsPost: [
            ...(item?.productDescriptionsPost
              ?.filter(i => i?.id !== id)
              .map(i => ({
                [DescriptionFields.ID]: i?.[DescriptionFields.ID],
                [DescriptionFields.Title]: i?.[DescriptionFields.Title],
                [DescriptionFields.Descriptions]: i?.[DescriptionFields.Descriptions],
                [DescriptionFields.Image]: i?.[DescriptionFields.Image]?.data?.id,
              })) ?? []),
          ],
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
              <h1 className="font-bold text-2xl md:text-5xl break-words max-w-[90%]">
                {product?.attributes?.title}
              </h1>
              <IconButton
                onClick={toggleAddProductForm}
                icon="Edit"
                className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-purple-700"
              />
            </div>
            <p className="text-sm md:text-lg">{product?.attributes?.description}</p>
            {product?.attributes?.imagePreview?.data?.attributes?.formats?.large?.url && (
              <div className="relative flex md:hidden overflow-hidden rounded-2xl">
                {product?.attributes?.discount ? (
                  <DiscountLabel discount={product.attributes.discount} />
                ) : null}
                <Image
                  alt={
                    product.attributes.imagePreview.data?.attributes?.alternativeText ??
                    product.attributes.title ??
                    'Фото продукту'
                  }
                  src={
                    process.env.BASE_API_URL +
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
                  🔥 {product?.attributes?.price?.toFixed(0)} грн
                </p>
                <p className="text-[#828282] text-base line-through">
                  {product?.attributes?.priceOld?.toFixed(0)} грн
                </p>
              </div>
              <Rate rate={product?.attributes?.rating ?? 4.8} />
            </div>
            <CountdownTimer />
          </div>
          {product?.attributes?.imagePreview?.data?.attributes?.url && (
            <div className="relative hidden md:flex overflow-hidden rounded-2xl">
              {product?.attributes?.discount ? (
                <DiscountLabel discount={product.attributes.discount} />
              ) : null}
              <Image
                alt={
                  product.attributes.imagePreview.data.attributes.alternativeText ??
                  product.attributes.title ??
                  'Фото продукту'
                }
                src={process.env.BASE_API_URL + product.attributes.imagePreview.data.attributes.url}
                width={product.attributes.imagePreview.data.attributes.width ?? 198}
                height={product.attributes.imagePreview.data.attributes.height ?? 198}
                priority
              />
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-8 md:gap-11 md:mt-20">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#F4F3FD]">
            <h2 className="font-bold text-2xl md:text-5xl break-words">Докладний опис</h2>
            {!!product?.attributes?.productTableDescriptions?.length && (
              <dl className="mt-4 sm:mt-7">
                {product?.attributes?.productTableDescriptions?.map(
                  item =>
                    item?.text && (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-2 sm:mb-4 last:mb-0"
                      >
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
                className="flex justify-center items-center gap-2 rounded-full border border-black text-sm font-semibold px-6 py-3 mt-2 sm:mt-4 transition-all duration-200 hover:text-[#7613B5] hover:border-[#7613B5]"
              >
                <Plus />
                Додати опис
              </button>
            )}
          </div>
          <div
            className={`relative flex mt-14 md:mt-0 ${
              !product?.attributes?.video ? 'mb-10 md:mb-0' : ''
            }`}
          >
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

        {product?.attributes?.productDescriptions?.map(item => (
          <section key={item?.id} className="mt-8 md:mt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="font-bold text-2xl md:text-5xl">{item?.title}</h2>
              {!isOpenTableDescriptionForm && (
                <button
                  onClick={() => toggleProductDescriptionForm()}
                  className="flex justify-center items-center gap-2 rounded-full border border-black text-sm font-semibold px-6 py-3 transition-all duration-200 hover:text-[#7613B5] hover:border-[#7613B5]"
                >
                  <Plus />
                  Додати варіант
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8 md:gap-11 md:mt-10">
              {item?.productDescriptionsPost?.map(
                i =>
                  i?.title && (
                    <div key={i.id} className="flex relative">
                      <ProductOptionCard
                        title={i.title}
                        text={i.descriptions ?? ''}
                        image={i.image?.data?.attributes as UploadFile}
                      />
                      <div className="flex flex-col gap-1 absolute top-0 -right-10">
                        <IconButton
                          onClick={() => toggleProductDescriptionForm(i.id)}
                          icon="Edit"
                          className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-purple-700"
                        />
                        <IconButton
                          icon="Delete"
                          className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-red-500"
                          onClick={() => handleDeleteProductPostDescription(i.id)}
                        />
                      </div>
                    </div>
                  ),
              )}
            </div>
          </section>
        ))}

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

        <AddEditProductDescriptionForm
          isOpen={isOpenProductDescriptionForm}
          toggleForm={toggleProductDescriptionForm}
          editProductDescriptionID={editProductDescriptionID}
          productDescriptions={product?.attributes?.productDescriptions}
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
