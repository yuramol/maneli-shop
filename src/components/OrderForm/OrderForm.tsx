import { FormikValues, useFormikContext } from 'formik';
import Image from 'next/legacy/image';

import { DiscountLabel, OptionsSwitcher, QuantitySelector, TextField } from '@/legos';
import productImage from '../../assets/rectangle-25.png';
import { OrderUserFields } from './types';

export const colorOptions = [{ value: '#FFFFFF' }, { value: '#A9A9A9' }, { value: '#464646' }];
export const modelOptions = [
  { label: '5W', value: '5' },
  { label: '7W', value: '7' },
  { label: '12W', value: '12' },
];

export const OrderForm = () => {
  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormikContext<FormikValues>();

  return (
    <>
      <h2 className="font-bold text-xl mb-6 mt-3 sm:mt-0 md:text-3xl ">Ваше замовлення:</h2>
      <form className="flex flex-col gap-6 sm:gap-10" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="relative flex w-full h-full max-w-[98px] max-h-[98px] sm:max-w-[134px] sm:max-h-[134px] overflow-hidden rounded-2xl border border-[#9142C4]">
            <DiscountLabel smallSize discount={40} />
            <Image src={productImage} objectFit="cover" alt="Product photo" />
          </div>
          <div className="flex flex-col justify-between w-full">
            <h3 className="font-semibold md:text-2xl">Портативна світлодіодна USB лампа</h3>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-baseline sm:gap-6">
                <p className="text-[#F6543E] font-bold sm:font-semibold sm:text-2xl">
                  {`${240 * (1 - 40 / 100)} грн`}
                </p>
                <p className="text-[#828282] text-xs sm:text-2xl line-through">240 грн</p>
              </div>
              <QuantitySelector
                name={OrderUserFields.Quantity}
                value={values[OrderUserFields.Quantity]}
                setValue={setFieldValue}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-4/6 self-center">
          <OptionsSwitcher
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
          />
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
    </>
  );
};
