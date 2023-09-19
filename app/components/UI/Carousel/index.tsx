"use client";

import "pure-react-carousel/dist/react-carousel.es.css";

import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
} from "pure-react-carousel";
import type { ReactElement, ReactNode } from "react";

import type { CarouselProviderProps } from "pure-react-carousel";
import useCarouselSlides from "./useCarouselSlides";

type Props = Omit<
    CarouselProviderProps,
    "className" | "infinite" | "visibleSlides"
> & {
    backButton?: ReactElement;
    frontButton?: ReactElement;
    // each child needs to be wrapped in a Carousel Item
    children: ReactNode;
};

const Carousel = ({
    backButton,
    frontButton,
    children,
    ...carouselProviderProps
}: Props) => {
    const slides = useCarouselSlides();
    return (
        <CarouselProvider
            {...carouselProviderProps}
            className="flex items-center justify-between gap-3"
            visibleSlides={slides}
            infinite
        >
            {backButton ? <ButtonBack>{backButton}</ButtonBack> : null}
            <Slider className="flex-1">{children}</Slider>
            {frontButton ? <ButtonNext>{frontButton}</ButtonNext> : null}
        </CarouselProvider>
    );
};

export default Carousel;
