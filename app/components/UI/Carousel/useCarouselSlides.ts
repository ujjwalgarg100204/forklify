import { useEffect, useState } from "react";

import useWindowSize from "@hooks/useWindowSize";

const useCarouselSlides = () => {
    const [slides, setSlides] = useState<number>(1);
    const { width } = useWindowSize();

    // update visible slides based on width of screen
    useEffect(() => {
        if (!width) return;
        if (width <= 480) setSlides(1); // mobile screen
        else if (width <= 768) setSlides(2); // tabs
        else if (width <= 1200) setSlides(3); // desktop & laptop
        else setSlides(4); // insanely large screen
    }, [width]);

    return slides;
};

export default useCarouselSlides;
