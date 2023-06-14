import { ArrowCircleLeft, ArrowCircleRight, IconButton, Plus } from '@/legos';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ReviewCarousel } from '../ReviewCarousel';
import Image from 'next/image';
import { AddEditReview } from '../AddEditReview';
import { ProductEntity } from '@/__generated__/types';
import { useUpdateProductMutation } from '@/graphql/mutations/__generated__/updateProduct';
import { ProductDocument } from '@/graphql/queries/__generated__/product';
import { useRemoveFileMutation } from '@/graphql/mutations/__generated__/removeFile';

type Props = {
  product?: ProductEntity | null;
  id?: string;
  isAdmin?: boolean;
};
export const Reviews: FC<Props> = ({ product, id, isAdmin }) => {
  const carouselRef = useRef(null);
  const [updateProductMutation] = useUpdateProductMutation();
  const [isOpenAddEditReviewForm, setIsOpenAddEditReviewForm] = useState(false);
  const [removeFileMutation] = useRemoveFileMutation();
  const [xsScreen, setXsScreen] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setXsScreen(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handlePrev = () => {
    (carouselRef?.current as any)?.onClickPrev();
  };
  const handleNext = () => {
    (carouselRef?.current as any)?.onClickNext();
  };

  const toggleAddEditReviewForm = () => {
    setIsOpenAddEditReviewForm(isOpen => !isOpen);
  };
  const reviews = product?.attributes?.reviews?.data;

  const handleDeleteReview = useCallback(
    (reviewId: string) => {
      const data = {
        reviews: reviews?.filter(item => item.id !== reviewId)?.map(({ id }) => `${id}`) || [],
      };
      updateProductMutation({
        variables: { id: id as string, data },
        refetchQueries: [ProductDocument],
      })
        .then(({ data }) => {
          if (data?.updateProduct?.data?.id) {
            removeFileMutation({ variables: { id: reviewId } });
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    [id, removeFileMutation, reviews, updateProductMutation],
  );

  return (
    <section className="mt-8 md:mt-12">
      <div className="flex flex-row gap-6 justify-between items-center">
        <div className="flex gap-6 items-center">
          <h2 className="font-bold text-2xl md:text-5xl">Відгуки</h2>
          {isAdmin && (
            <button
              onClick={() => toggleAddEditReviewForm()}
              className="flex justify-center items-center gap-2 rounded-full border border-black text-sm font-semibold px-6 py-3 transition-all duration-200 hover:text-[#7613B5] hover:border-[#7613B5]"
            >
              <Plus />
              Додати відгук
            </button>
          )}
        </div>
        {reviews?.length && reviews?.length > 1 ? (
          <div className="flex flex-row gap-6 md:gap-10">
            <button onClick={() => handlePrev()}>
              <ArrowCircleLeft />
            </button>
            <button onClick={() => handleNext()}>
              <ArrowCircleRight />
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex justify-center mt-8 md:my-16">
        <div className="flex relative items-center">
          <ReviewCarousel ref={carouselRef} carouselSize={xsScreen ? 330 : 580}>
            {reviews?.map(({ attributes, id }) => (
              <div
                key={`${attributes?.url}`}
                className="relative flex w-[330px] h-[170px] sm:h-[300px] sm:w-[580px] items-center overflow-hidden rounded-2xl"
              >
                {attributes?.url && (
                  <Image
                    src={process.env.BASE_API_URL + attributes.url}
                    alt="Review photo"
                    objectFit="cover"
                    layout="fill"
                  />
                )}
                {isAdmin && (
                  <div className="absolute flex flex-col top-0 left-0 w-full h-full justify-center content-center bg-black transition-opacity duration-500 linear opacity-0 hover:opacity-70">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-3">
                      <IconButton
                        icon="Delete"
                        className="border border-white p-4 rounded-full text-white transition-all duration-150 hover:text-red-500 hover:border-red-500"
                        onClick={() => handleDeleteReview(id as string)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ReviewCarousel>
        </div>
      </div>
      {isAdmin && (
        <AddEditReview
          isOpen={isOpenAddEditReviewForm}
          toggleForm={toggleAddEditReviewForm}
          product={product}
        />
      )}
    </section>
  );
};
