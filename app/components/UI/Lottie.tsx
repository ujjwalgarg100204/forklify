"use client";

import { IPlayerProps, Player } from "@lottiefiles/react-lottie-player";

const Lottie = (props: IPlayerProps) => {
    return <Player {...props} autoplay loop />;
};

export default Lottie;
