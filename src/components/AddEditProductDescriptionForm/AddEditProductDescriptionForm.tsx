import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Modal, TextField } from '@/legos';
import { Props, DescriptionFields } from './types';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { useRouter } from 'next/router';
import { ProductDocument } from '@/graphql/queries/__generated__/product';
import { AddEditImage } from '../AddEditImage';
import { TextArea } from '@/legos/TextArea';

export const AddEditProductDescriptionForm: FC<Props> = ({
  isOpen,
  toggleForm,
  editProductDescriptionID,
  productDescriptions,
}) => {
  const { query } = useRouter();
  const [updateProductMutation] = useUpdateProductMutation();
  const finedProductDescriptionPost = productDescriptions?.[0]?.productDescriptionsPost?.find(
    item => item?.id === editProductDescriptionID,
  );

  const initialValues = {
    [DescriptionFields.ID]: finedProductDescriptionPost?.id ?? undefined,
    [DescriptionFields.Title]: finedProductDescriptionPost?.title ?? '',
    [DescriptionFields.Descriptions]: finedProductDescriptionPost?.descriptions ?? '',
    [DescriptionFields.Image]: finedProductDescriptionPost?.image?.data?.id ?? undefined,
  };

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
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
      const data = {
        productDescriptions: [
          ...(productDescriptions?.map(item => ({
            id: item?.id,
            title: item?.title,
            productDescriptionsPost: [
              ...(item?.productDescriptionsPost?.map(i => ({
                [DescriptionFields.ID]: i?.[DescriptionFields.ID],
                [DescriptionFields.Title]: i?.[DescriptionFields.Title],
                [DescriptionFields.Descriptions]: i?.[DescriptionFields.Descriptions],
                [DescriptionFields.Image]: i?.[DescriptionFields.Image]?.data?.id,
              })) ?? []),
              values,
            ],
          })) ?? []),
        ],
      };

      updateProductMutation({
        variables: { id: query.id as string, data },
        refetchQueries: [ProductDocument],
      }).then(() => {
        handleToggleForm();
      });
    },
  });

  const setImageID = (id?: string | null) => {
    setFieldValue(DescriptionFields.Image, id);
  };

  return (
    <Modal isOpen={isOpen} toggleModal={handleToggleForm}>
      <form className="flex flex-col justify-between h-full gap-4" onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl mb-6 mt-3 sm:mt-0 md:text-3xl ">
          Додати/редагувати варіанти користування:
        </h2>
        <div className="flex gap-8">
          <div className="flex shrink-0 w-[198px] h-[254px]">
            <AddEditImage
              currentImageID={values[DescriptionFields.Image]}
              handleSetUploadImageId={setImageID}
            />
          </div>
          <div className="flex flex-col w-full gap-8">
            <TextField
              label="Назва"
              name={DescriptionFields.Title}
              value={values[DescriptionFields.Title]}
              onChange={handleChange}
              onBlur={handleBlur}
              isError={
                !!errors[DescriptionFields.Title] && (touched[DescriptionFields.Title] as boolean)
              }
              errorText={errors[DescriptionFields.Title] as string}
            />
            <TextArea
              label="Опис"
              name={DescriptionFields.Descriptions}
              value={values[DescriptionFields.Descriptions]}
              onChange={handleChange}
            />
          </div>
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
