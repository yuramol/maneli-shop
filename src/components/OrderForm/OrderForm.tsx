import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/legacy/image';

import { DiscountLabel, Modal, OptionsSwitcher, QuantitySelector, TextField } from '@/legos';
import { OrderUserFields, Props } from './types';
import { useCreateOrderMutation } from '@/graphql/mutations/__generated__/createOrder';

export const colorOptions = [{ value: '#FFFFFF' }, { value: '#A9A9A9' }, { value: '#464646' }];

export const modelOptions = [
  { label: '5W', value: '5' },
  { label: '7W', value: '7' },
  { label: '12W', value: '12' },
];

export const OrderForm: FC<Props> = ({ isOpen, toggleForm, productData }) => {
  const [createOrderMutation] = useCreateOrderMutation();

  const initialValues = {
    [OrderUserFields.Quantity]: 1,
    [OrderUserFields.Name]: '',
    [OrderUserFields.Phone]: '',
    // [OrderUserFields.Color]: colorOptions[0].value ?? '',
    // [OrderUserFields.Model]: modelOptions[0].value ?? '',
  };

  const phoneRegExp = /^(\+380|0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const validationSchema = yup.object({
    [OrderUserFields.Name]: yup.string().required('Будь ласка, заповніть дане поле'),
    [OrderUserFields.Phone]: yup
      .string()
      .required('Будь ласка, заповніть дане поле')
      .matches(phoneRegExp, 'Будь ласка, вкажіть коректно телефон'),
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ name, phone, quantity }) => {
      const data = {
        productId: productData?.id,
        productModification: '',
        quantity,
        userName: name,
        userPhone: phone,
      };
      createOrderMutation({
        variables: {
          data: data,
        },
      });
    },
  });

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
  };

  return (
    <Modal isOpen={isOpen} toggleModal={handleToggleForm}>
      <h2 className="font-bold text-xl mb-6 mt-3 sm:mt-0 md:text-3xl ">Ваше замовлення:</h2>
      <form className="flex flex-col gap-6 sm:gap-10" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="relative flex w-full h-full max-w-[98px] max-h-[98px] sm:max-w-[134px] sm:max-h-[134px] overflow-hidden rounded-2xl border border-[#9142C4]">
            {productData?.attributes?.discount ? (
              <DiscountLabel smallSize discount={productData.attributes.discount} />
            ) : null}
            <Image
              alt={
                productData?.attributes.imagePreview.data?.attributes?.alternativeText ??
                productData?.attributes.title ??
                'Фото продукту'
              }
              src={
                process.env.BASE_API_URL +
                productData?.attributes.imagePreview.data?.attributes?.url
              }
              width={productData?.attributes.imagePreview.data?.attributes?.width as number}
              height={productData?.attributes.imagePreview.data?.attributes?.height as number}
              priority
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <h3 className="font-semibold md:text-2xl">{productData?.attributes?.title}</h3>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-baseline sm:gap-6">
                <p className="text-[#F6543E] font-bold sm:font-semibold sm:text-2xl">
                  {productData?.attributes?.price} грн
                </p>
                <p className="text-[#828282] text-xs sm:text-2xl line-through">
                  {productData?.attributes?.priceOld ?? 0} грн
                </p>
              </div>
              <QuantitySelector
                name={OrderUserFields.Quantity}
                value={values[OrderUserFields.Quantity]}
                setValue={setFieldValue}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold md:text-2xl">Загальна вартість:</p>
          <p className="font-semibold md:text-2xl pr-2">
            {productData?.attributes?.price * values.quantity} грн
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-4/6 self-center">
          {/* <OptionsSwitcher
            title="Колір"
            showLabels={false}
            name={OrderUserFields.Color}
            value={values[OrderUserFields.Color]}
            options={colorOptions}
            onChange={handleChange}
          />
          <OptionsSwitcher
            title="Модель"
            name={OrderUserFields.Model}
            value={values[OrderUserFields.Model]}
            options={modelOptions}
            onChange={handleChange}
          /> */}
          <TextField
            label="Імʼя отримувача"
            type="text"
            name={OrderUserFields.Name}
            value={values[OrderUserFields.Name]}
            placeholder="Павло"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={!!errors[OrderUserFields.Name] && (touched[OrderUserFields.Name] as boolean)}
            errorText={errors[OrderUserFields.Name] as string}
          />
          <TextField
            label="Ваш телефон"
            type="tel"
            name={OrderUserFields.Phone}
            value={values[OrderUserFields.Phone]}
            placeholder="+380 XX XXX XX XX"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={!!errors[OrderUserFields.Phone] && (touched[OrderUserFields.Phone] as boolean)}
            errorText={errors[OrderUserFields.Phone] as string}
          />
          <button
            type="submit"
            className="rounded-full bg-[#7613B5] text-white text-base font-semibold mt-2 p-4 w-full"
          >
            Оформити замовлення
          </button>
        </div>
      </form>
    </Modal>
  );
};
