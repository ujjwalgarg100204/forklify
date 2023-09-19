"use client";

import SearchBar, { Props as SearchBarProps } from "@components/UI/SearchBar";
import { useEffect, useState } from "react";

import { APIResponse } from "@/app/types/api";
import TextField from "@mui/material/TextField";
import { Recipe as PRecipe } from "@prisma/client";
import { API } from "@utils/api";
import { useRouter } from "next/navigation";
import SearchBarResultCard from "./RecipeCards/SearchBarResultCard";

type Recipe = Pick<PRecipe, "id" | "avatar" | "title" | "category" | "region">;

const fetchRecipes = async (query: string) => {
    const recipes = await API.get<APIResponse<{ recipes: Recipe[] }>>(
        "recipe/search",
        { params: { q: query } },
    );

    return recipes.data;
};

const RecipeSearchBar = () => {
    const router = useRouter();
    const [input, setInput] = useState<string>("");
    const [options, setOptions] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (input === "") return;
        const timeout = setTimeout(() => {
            // fetch data from server and set options
            fetchRecipes(input)
                .then(res => {
                    if (res.status === "error") return setError(res.message);
                    setOptions(res.data.recipes);
                    setError(null);
                })
                .catch(err => setError(err.message));
        }, 500);

        return () => clearTimeout(timeout);
    }, [input]);

    const handleOptionSelection: SearchBarProps<Recipe>["onSelection"] = (
        _,
        recipe,
    ) => {
        if (!recipe) return;
        router.push(`/recipe/${recipe.id}`);
    };

    const handleInputChange: SearchBarProps<Recipe>["onInputChange"] = (
        _,
        value,
        reason,
    ) => {
        if (reason !== "input") return;
        setInput(value);
    };

    const handleRenderingOfInput: SearchBarProps<Recipe>["renderInput"] =
        params => (
            <TextField
                {...params}
                error={error !== null}
                helperText={error}
                variant="standard"
                placeholder="Search Your Recipe..."
                fullWidth
            />
        );

    const handleRenderingOfOption: SearchBarProps<Recipe>["renderOption"] = (
        props,
        option,
    ) => {
        return <SearchBarResultCard {...props} recipe={option} />;
    };

    return (
        <SearchBar<Recipe>
            onSelection={handleOptionSelection}
            onInputChange={handleInputChange}
            renderInput={handleRenderingOfInput}
            renderOption={handleRenderingOfOption}
            getOptionLabel={option => option.title}
            noOptionsText="No recipes found, maybe try other keywords?"
            options={options}
            inputVal={input}
        />
    );
};

export default RecipeSearchBar;
