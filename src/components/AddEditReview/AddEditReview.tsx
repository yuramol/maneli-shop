import { FC, useEffect } from 'react';
import { useFormik } from 'formik';

import { Modal } from '@/legos';
import { Props } from './types';
import { AddEditImage } from '../AddEditImage';
import { useRouter } from 'next/router';
import { ProductDocument } from '@/graphql/queries/__generated__/product';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';

export const AddEditReview: FC<Props> = ({ isOpen, toggleForm, product }) => {
  const [updateProductMutation] = useUpdateProductMutation();
  const reviews = product?.attributes?.reviews?.data;
  const { query } = useRouter();

  const { setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: {
      id: '',
    },
    enableReinitialize: true,
    onSubmit: values => {
      const reviewsPrevIds = reviews?.map(({ id }) => `${id}`);
      const data = {
        reviews: [...(reviewsPrevIds ? reviewsPrevIds : []), values.id],
      };

      updateProductMutation({
        variables: { id: query.id as string, data },
        refetchQueries: [ProductDocument],
      })
        .then(({ data }) => {
          if (data?.updateProduct?.data?.id) {
            handleToggleForm();
            resetForm();
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
  });

  const handleToggleForm = () => {
    resetForm();
    toggleForm();
  };

  const setImagePreviewId = (id?: string | null) => {
    setFieldValue('id', id);
  };

  return (
    <Modal isOpen={isOpen} toggleModal={handleToggleForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl mt-3 sm:mt-0 md:text-3xl ">Додати відгук:</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative flex shrink-0 w-full min-h-[200px] h-[300px] ">
            <div className="relative flex w-full h-full items-center justify-center">
              {isOpen && (
                <AddEditImage handleSetUploadImageId={setImagePreviewId} currentImageID={''} />
              )}
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
