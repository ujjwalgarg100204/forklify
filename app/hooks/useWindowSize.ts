"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<{
        width?: number;
        height?: number;
    }>({ width: undefined, height: undefined });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () =>
            setWindowSize({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            });

        // update width & height when user starts resizing the window
        window.addEventListener("resize", handleResize);

        // update width & height
        handleResize();

        // cleanup function
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
