import { FormikValues, useFormikContext } from 'formik';
import Image from 'next/legacy/image';

import { DiscountLabel, OptionsSwitcher, QuantitySelector, TextField } from '@/legos';
import productImage from '../../assets/rectangle-25.png';
import { AddProductFields } from './types';
import { TextArea } from '@/legos/TextArea';

export const AddProductForm = ({ toggleModal }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormikContext<FormikValues>();

  return (
    <form className="flex flex-col  h-full justify-between gap-4" onSubmit={handleSubmit}>
      <h2 className="font-bold text-xl mb-6 mt-3 sm:mt-0 md:text-3xl ">Додати новий продукт:</h2>
      <div className="flex gap-4">
        <div className="relative flex w-full h-full max-w-[198px] max-h-[198px] overflow-hidden rounded-2xl border border-[#9142C4]">
          {values[AddProductFields.Discount] && (
            <DiscountLabel smallSize discount={values[AddProductFields.Discount]} />
          )}
          <Image src={productImage} objectFit="cover" alt="Product photo" />
        </div>
        <TextField
          label="Назва продукту"
          name={AddProductFields.Title}
          value={values[AddProductFields.Title]}
          placeholder="Продукт"
          onChange={handleChange}
          onBlur={handleBlur}
          isError={!!errors[AddProductFields.Title] && (touched[AddProductFields.Title] as boolean)}
          errorText={errors[AddProductFields.Title] as string}
        />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-stretch">
          <TextField
            label="Ціна"
            type="number"
            name={AddProductFields.Price}
            value={values[AddProductFields.Price]}
            placeholder="Продукт"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={
              !!errors[AddProductFields.Price] && (touched[AddProductFields.Price] as boolean)
            }
            errorText={errors[AddProductFields.Price] as string}
          />
          <TextField
            label="Знижка"
            type="number"
            name={AddProductFields.Discount}
            value={values[AddProductFields.Discount]}
            placeholder="Продукт"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={
              !!errors[AddProductFields.Discount] && (touched[AddProductFields.Discount] as boolean)
            }
            errorText={errors[AddProductFields.Discount] as string}
          />
        </div>

        <TextArea
          label="Опис"
          type="description"
          rows="5"
          name={AddProductFields.Description}
          value={values[AddProductFields.Description]}
          placeholder="Чому це дуже файний продукт"
          onChange={handleChange}
          onBlur={handleBlur}
          isError={
            !!errors[AddProductFields.Description] &&
            (touched[AddProductFields.Description] as boolean)
          }
          errorText={errors[AddProductFields.Description] as string}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={toggleModal}
          className="rounded-full border border-[#7613B5] text-base font-semibold mt-2 p-4 w-full"
        >
          Відмінити
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#7613B5] text-white text-base font-semibold mt-2 p-4 w-full"
        >
          Додати
        </button>
      </div>
    </form>
  );
};
