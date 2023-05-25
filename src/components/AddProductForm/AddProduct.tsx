import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import { DiscountLabel, Modal, TextField } from '@/legos';
import { AddProductFields, Props } from './types';
import { TextArea } from '@/legos/TextArea';
import { AddImage } from '../AddImage/AddImage';

import { useCreateProductMutation } from '@/graphql/mutations/__generated__/createProduct';
import { ProductsDocument } from '@/graphql/queries/__generated__/products';

export const AddProductForm: FC<Props> = ({ isOpen, toggleForm }) => {
  const router = useRouter();
  const [createProductMutation] = useCreateProductMutation();

  const initialValues = {
    [AddProductFields.Title]: '',
    [AddProductFields.Description]: '',
    [AddProductFields.Discount]: 0,
    [AddProductFields.Price]: 0,
    [AddProductFields.Rating]: 0,
    [AddProductFields.ImagePreview]: null,
  };

  const validationSchema = yup.object({
    [AddProductFields.Title]: yup.string().required('Будь ласка, заповніть дане поле'),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      createProductMutation({ variables: { ...values }, refetchQueries: [ProductsDocument] }).then(
        ({ data }) => {
          setTimeout(() => {
            router.push(`admin/product/${data?.createProduct?.data?.id}`);
          }, 100);
        },
      );
    },
  });

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
  };

  return (
    <Modal isOpen={isOpen} toggleModal={handleToggleForm}>
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
            type="button"
            onClick={handleToggleForm}
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
    </Modal>
  );
};
