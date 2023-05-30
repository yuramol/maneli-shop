import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Modal, TextField } from '@/legos';
import { Props, VideoFields } from './types';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { useRouter } from 'next/router';
import { ProductDocument } from '@/graphql/queries/__generated__/product';

export const AddEditProductVideoForm: FC<Props> = ({ isOpen, toggleForm, productVideo }) => {
  const { query } = useRouter();
  const [updateProductMutation] = useUpdateProductMutation();

  const initialValues = {
    [VideoFields.Video]: productVideo ?? '',
  };

  const validationSchema = yup.object({
    [VideoFields.Video]: yup.string().required('Будь ласка, заповніть дане поле'),
  });

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      updateProductMutation({
        variables: { id: query.id as string, data: { ...values } },
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
          Додати/редагувати відео:
        </h2>
        <div className="flex flex-col gap-8">
          <TextField
            label="URL посилання на відео"
            name={VideoFields.Video}
            value={values[VideoFields.Video]}
            onChange={handleChange}
            onBlur={handleBlur}
            isError={!!errors[VideoFields.Video] && (touched[VideoFields.Video] as boolean)}
            errorText={errors[VideoFields.Video] as string}
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
