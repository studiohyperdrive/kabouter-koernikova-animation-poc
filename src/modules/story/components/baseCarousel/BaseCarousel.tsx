import React, { FC } from "react";
import Carousel from "react-multi-carousel";
import cx from "classnames/bind";
import styles from "./BaseCarousel.module.scss";

const cxBind = cx.bind(styles);

interface IBaseCarouselProps {
  children: React.ReactNode;
  dataLength: number;
  onSlideChange: (currentItemIndex: number) => void;
  className?: string;
}

export const BaseCarousel: FC<IBaseCarouselProps> = ({
  children,
  className,
  onSlideChange,
  dataLength,
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const beforeSlideChange = (prev: number, curr: number) => {
    const itemIndex = (
      document.querySelector(".react-multi-carousel-item--active")
        ?.firstChild as HTMLElement
    ).dataset.index;

    if (prev > curr) {
      Number(itemIndex) === dataLength - 1
        ? onSlideChange(0)
        : onSlideChange(Number(itemIndex) + 1);
    } else {
      Number(itemIndex) === 0
        ? onSlideChange(dataLength - 1)
        : onSlideChange(Number(itemIndex) - 1);
    }
  };

  return (
    <Carousel
      autoPlaySpeed={3000}
      infinite
      centerMode
      containerClass={cxBind("carousel-container", className)}
      itemClass={cxBind("carousel-item")}
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      responsive={responsive}
      rewindWithAnimation={true}
      shouldResetAutoplay
      showDots={false}
      slidesToSlide={1}
      draggable
      swipeable
      transitionDuration={1000}
      beforeChange={(previousSlide, { currentSlide }) =>
        beforeSlideChange(previousSlide, currentSlide)
      }
    >
      {children}
    </Carousel>
  );
};
