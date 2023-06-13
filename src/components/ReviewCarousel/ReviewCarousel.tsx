import { forwardRef, Ref, LegacyRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const ReviewCarousel = forwardRef<Carousel, any>(function ReviewCarousel(
  { children, carouselSize, isMobile, isHorizontal },
  ref: Ref<Carousel>,
) {
  if (children) {
    return (
      <Carousel
        ref={ref as LegacyRef<Carousel>}
        infiniteLoop
        transitionTime={1500}
        showThumbs={false}
        className={`carousel-card ${isMobile && !isHorizontal ? 'carousel-card-mobile' : ''}`}
        renderArrowNext={() => null}
        statusFormatter={() => ''}
        width={carouselSize ?? undefined}
        renderArrowPrev={() => null}
        renderIndicator={() => ''}
      >
        {children}
      </Carousel>
    );
  }
  return null;
});

ReviewCarousel.displayName = 'ReviewCarousel';
