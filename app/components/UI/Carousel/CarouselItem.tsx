"use client";

import type { SlideProps } from "pure-react-carousel";
import { Slide } from "pure-react-carousel";

type Props = SlideProps;

const CarouselItem = (props: Props) => {
    return <Slide {...props}>{props.children}</Slide>;
};

export default CarouselItem;
