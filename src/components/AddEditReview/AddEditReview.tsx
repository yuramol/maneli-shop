import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Modal } from '@/legos';
import { Props } from './types';
import { AddEditImage } from '../AddEditImage';
import { ChangeImage } from '../AddEditImage/components/ChangeImage';
import Image from 'next/image';

export const AddEditReview: FC<Props> = ({ isOpen, toggleForm, product }) => {
  const initialValues = {
    imagePreview: product?.attributes?.imagePreview?.data?.id ?? undefined,
  };

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
    enableReinitialize: true,
    onSubmit: values => {
      console.log('%c jordan values', 'color: lime;', values);
    },
  });

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
  };

  const setImagePreviewId = (id?: string | null) => {
    setFieldValue('imagePreview', id);
  };

  return (
    <Modal isOpen={isOpen} toggleModal={handleToggleForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl mt-3 sm:mt-0 md:text-3xl ">Додати новий продукт:</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative flex shrink-0 w-[198px] h-[254px] ">
            <div className="relative flex w-full h-full">
              {/* {false ? (
                <Image
                  src={process.env.BASE_API_URL}
                  alt="Фото продукту"
                  objectFit="cover"
                  width={198}
                  height={198}
                />
              ) : (
                <span className="m-auto">Додайте фото</span>
              )}
              <ChangeImage
              // imageId={localUploadImg?.id as string}
              // handleUploadImg={handleUploadImg}
              // handleDeleteImg={handleDeleteImg}
              /> */}
            </div>
          </div>
        </div>

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
