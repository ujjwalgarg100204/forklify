"use client";

import { ChangeEvent, useState } from "react";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import type { Recipe } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

type Props = Pick<Recipe, "ingredients">;

const IngredientSection = ({ ingredients }: Props) => {
    const [servings, setServings] = useState(1);

    const handleServingsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newServings = +event.target.value;
        if (isNaN(newServings)) return setServings(1);
        setServings(newServings);
    };

    const incrementServings = () => setServings(prev => prev + 1);
    const decrementServings = () =>
        setServings(prev => (prev <= 1 ? 1 : prev - 1));

    return (
        <section className="grid grid-cols-2 gap-y-2 md:items-center md:gap-y-4 md:justify-self-start">
            <h2 className="h-fit text-2xl font-bold text-gray-800 md:text-3xl">
                Ingredients
            </h2>
            <div className="flex h-fit items-center justify-end gap-2 md:self-start md:justify-self-end">
                <IconButton
                    sx={{
                        width: { xs: 16, md: 40 },
                        height: { xs: 16, md: 40 },
                    }}
                    onClick={incrementServings}
                >
                    <ControlPointIcon
                        color="primary"
                        sx={{ fontSize: { md: 28 } }}
                    />
                </IconButton>
                <div className="flex items-center gap-1">
                    <TextField
                        variant="standard"
                        sx={{ width: "2ch" }}
                        InputProps={{ disableUnderline: true }}
                        value={servings}
                        onChange={handleServingsChange}
                    />
                    <span className="text-sm md:text-base">servings</span>
                </div>
                <IconButton
                    sx={{
                        width: { xs: 16, md: 40 },
                        height: { xs: 16, md: 40 },
                    }}
                    onClick={decrementServings}
                >
                    <RemoveCircleIcon
                        color="primary"
                        sx={{ fontSize: { md: 28 } }}
                    />
                </IconButton>
            </div>

            <ul className="col-span-2 space-y-1 md:space-y-2">
                {ingredients.map(ingredient => (
                    <li
                        key={uuidV4()}
                        className="relative ml-5 text-base lg:text-lg"
                    >
                        <span className="absolute -left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-orange"></span>
                        <span className="font-semibold">
                            {ingredient.quantity.num * servings}
                        </span>{" "}
                        <span className="font-semibold">
                            {ingredient.quantity.suffix}
                        </span>{" "}
                        {ingredient.name}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default IngredientSection;
