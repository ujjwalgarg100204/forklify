"use client";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { RecipeCategory, RecipeRegion } from "@prisma/client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { TRecipeFormSchema } from "./formSchema";

const HeaderInput = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<TRecipeFormSchema>();
    return (
        <section className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-flow-col md:grid-rows-2">
                <TextField
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    label="Title of Recipe"
                    placeholder="My awesome recipe"
                    variant="standard"
                />
                <TextField
                    {...register("avatar")}
                    error={!!errors.avatar}
                    helperText={errors.avatar?.message}
                    label="Image URL"
                    placeholder="https://example.com/image.jpg"
                    variant="standard"
                    multiline
                    maxRows={2}
                />
                <Image
                    src={watch("avatar")}
                    width={500}
                    height={500}
                    fetchPriority="low"
                    alt="preview of image"
                    className="h-64 w-full rounded-lg object-cover object-center shadow-md md:row-span-2 md:h-full"
                />
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <TextField
                    {...register("prepTime")}
                    error={!!errors.prepTime}
                    helperText={errors.prepTime?.message}
                    label="Preparation Time (mins)"
                    placeholder="30"
                    variant="standard"
                />
                <TextField
                    {...register("cookTime")}
                    error={!!errors.cookTime}
                    helperText={errors.cookTime?.message}
                    label="Cooking Time (mins)"
                    placeholder="40"
                    variant="standard"
                />
                <TextField
                    className="col-span-2 md:col-auto"
                    label="Total Time (mins)"
                    placeholder="70"
                    value={+watch("prepTime") + +watch("cookTime")}
                    InputProps={{ readOnly: true }}
                    variant="standard"
                />
            </div>
            <TextField
                {...register("desc")}
                error={!!errors.desc}
                helperText={errors.desc?.message}
                label="Short Description"
                placeholder="My awesome recipe will knock your socks off!"
                fullWidth
                multiline
                rows={4}
                variant="standard"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormControl fullWidth>
                    <InputLabel>Region</InputLabel>
                    <Select
                        {...register("region")}
                        error={!!errors.region}
                        label="Region"
                        inputProps={{ className: "capitalize" }}
                    >
                        {Object.values(RecipeRegion).map(region => (
                            <MenuItem
                                key={region}
                                value={region}
                                className="capitalize"
                            >
                                {region}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        {...register("category")}
                        error={!!errors.category}
                        label="Category"
                        inputProps={{ className: "capitalize" }}
                    >
                        {Object.values(RecipeCategory).map(category => (
                            <MenuItem
                                key={category}
                                value={category}
                                className="capitalize"
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </section>
    );
};

export default HeaderInput;
