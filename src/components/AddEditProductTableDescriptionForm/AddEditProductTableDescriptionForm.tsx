import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Modal, TextField } from '@/legos';
import { Props, TableDescriptionFields } from './types';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { useRouter } from 'next/router';
import { ProductDocument } from '@/graphql/queries/__generated__/product';

export const AddEditProductTableDescriptionForm: FC<Props> = ({
  isOpen,
  toggleForm,
  editTableDescriptionID,
  productTableDescriptions,
}) => {
  const { query } = useRouter();
  const [updateProductMutation] = useUpdateProductMutation();

  const finedProductTableDescription = productTableDescriptions?.find(
    item => item?.id === editTableDescriptionID,
  );

  const initialValues = {
    [TableDescriptionFields.ID]:
      finedProductTableDescription?.[TableDescriptionFields.ID] ?? undefined,
    [TableDescriptionFields.Text]:
      finedProductTableDescription?.[TableDescriptionFields.Text] ?? '',
    [TableDescriptionFields.Value]:
      finedProductTableDescription?.[TableDescriptionFields.Value] ?? '',
  };

  const validationSchema = yup.object({
    [TableDescriptionFields.Text]: yup.string().required('Будь ласка, заповніть дане поле'),
  });

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      const data = {
        productTableDescriptions: [
          ...(productTableDescriptions?.map(item => ({
            id: item?.id,
            text: item?.text,
            value: item?.value,
          })) ?? []),
          values,
        ],
      };

      updateProductMutation({
        variables: { id: query.id as string, data },
        refetchQueries: [ProductDocument],
      }).then(data => {
        handleToggleForm();
      });
    },
  });

  return (
    <Modal isOpen={isOpen} toggleModal={handleToggleForm}>
      <form className="flex flex-col justify-between h-full gap-4" onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl mb-6 mt-3 sm:mt-0 md:text-3xl ">
          Додати/редагувати опис:
        </h2>
        <div className="flex flex-col gap-8">
          <TextField
            label="Назва"
            name={TableDescriptionFields.Text}
            value={values[TableDescriptionFields.Text]}
            onChange={handleChange}
            onBlur={handleBlur}
            isError={
              !!errors[TableDescriptionFields.Text] &&
              (touched[TableDescriptionFields.Text] as boolean)
            }
            errorText={errors[TableDescriptionFields.Text] as string}
          />
          <TextField
            label="Значення"
            name={TableDescriptionFields.Value}
            value={values[TableDescriptionFields.Value]}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleToggleForm}
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
    </Modal>
  );
};
