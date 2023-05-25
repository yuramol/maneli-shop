import { FormikValues, useFormikContext } from 'formik';
import Image from 'next/legacy/image';

import { DiscountLabel, TextField } from '@/legos';
import { AddProductFields } from './types';
import { TextArea } from '@/legos/TextArea';
import { AddImage } from '../AddImage/AddImage';

export const AddProductForm = ({ toggleModal }: { toggleModal: () => void }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormikContext<FormikValues>();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="font-bold text-xl mt-3 sm:mt-0 md:text-3xl ">Додати новий продукт:</h2>
      <div className="flex gap-4 items-center">
        <div className="relative flex w-[198px] h-[254px] shrink-0">
          <AddImage currentImageID={values[AddProductFields.ImagePreview]} />
          {!!values[AddProductFields.Discount] && (
            <DiscountLabel smallSize discount={values[AddProductFields.Discount]} />
          )}
        </div>
        <div className="flex flex-col gap-5 w-full">
          <TextField
            label="Назва продукту"
            name={AddProductFields.Title}
            value={values[AddProductFields.Title]}
            placeholder="Продукт"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={
              !!errors[AddProductFields.Title] && (touched[AddProductFields.Title] as boolean)
            }
            errorText={errors[AddProductFields.Title] as string}
          />
          <TextField
            label="Ціна"
            type="number"
            name={AddProductFields.Price}
            value={values[AddProductFields.Price]}
            min={0}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <TextField
          label="Знижка"
          type="number"
          name={AddProductFields.Discount}
          value={values[AddProductFields.Discount]}
          min={0}
          max={100}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          label="Рейтинг"
          type="number"
          name={AddProductFields.Rating}
          value={values[AddProductFields.Rating]}
          step={0.1}
          min={0}
          max={5}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <TextArea
        label="Опис"
        rows={5}
        name={AddProductFields.Description}
        value={values[AddProductFields.Description]}
        placeholder="Чому це дуже файний продукт"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="flex mt-2 gap-4">
        <button
          onClick={toggleModal}
          className="rounded-full border border-[#7613B5] text-base font-semibold p-4 w-full"
        >
          Відмінити
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#7613B5] text-white text-base font-semibold p-4 w-full"
        >
          Додати
        </button>
      </div>
    </form>
  );
};
