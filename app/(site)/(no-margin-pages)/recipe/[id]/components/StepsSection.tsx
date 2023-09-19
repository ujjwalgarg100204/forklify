"use client";

import Button from "@mui/material/Button";
import type { Recipe } from "@prisma/client";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

const MINIMUM_STEPS_TO_SHOW = 5;

const StepsSection = ({ steps }: Pick<Recipe, "steps">) => {
    const [showAll, setShowAll] = useState(false);
    const handleClick = () => setShowAll(prev => !prev);
    return (
        <section className="space-y-3 md:row-span-2 md:space-y-4 md:justify-self-end">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Directions
            </h1>
            <ol className="flex flex-col gap-3">
                {steps
                    .slice(0, showAll ? undefined : MINIMUM_STEPS_TO_SHOW)
                    .map((step, i) => (
                        <li
                            key={uuidV4()}
                            className="space-y-0 text-base lg:text-lg"
                        >
                            <p className="font-semibold text-light-orange">
                                Step {i + 1}
                            </p>
                            <p className="text-black">{step}</p>
                        </li>
                    ))}
            </ol>
            <div className="flex justify-end">
                <Button
                    variant="text"
                    sx={{
                        textTransform: "capitalize",
                    }}
                    onClick={handleClick}
                    disabled={steps.length <= MINIMUM_STEPS_TO_SHOW}
                >
                    {showAll ? "Show Less" : "Show More"}
                </Button>
            </div>
        </section>
    );
};

export default StepsSection;
