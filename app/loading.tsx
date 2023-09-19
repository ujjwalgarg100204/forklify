"use client";

import Lottie from "@components/UI/Lottie";
import { getRandom } from "@utils/array";

const LOADING_PHRASES = [
    "Stirring up some culinary magic...",
    "Simmering the flavors to perfection...",
    "Chopping, dicing, and slicing ingredients...",
    "Whipping up a delicious creation...",
    "Baking in progress, get ready for a treat...",
    "Marinating for that extra burst of flavor...",
    "Blending the freshest ingredients together...",
    "Infusing aromatic spices for a delightful aroma...",
    "Slow-cooking for a melt-in-your-mouth experience...",
    "Grilling to add that perfect char and smokiness...",
    "Plating with artistic flair for a visual feast...",
    "Creating a symphony of tastes and textures...",
    "Frying to a golden, crispy perfection...",
    "Mixing and matching flavors for a unique twist...",
    "Garnishing for that final touch of elegance...",
];

const Loading = () => {
    return (
        <main className="flex flex-col items-center justify-center gap-8 px-4 py-16 md:px-8 md:py-32">
            <Lottie src="/lottie/food-bowl.json" className="h-64 w-64" />
            <p className="text-center text-base font-semibold text-orange md:text-lg lg:text-xl">
                {getRandom(LOADING_PHRASES)}
            </p>
        </main>
    );
};

export default Loading;
