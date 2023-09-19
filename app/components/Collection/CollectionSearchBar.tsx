"use client";

import SearchBar, { Props as SearchBarProps } from "@components/UI/SearchBar";
import { useEffect, useState } from "react";

import { APIResponse } from "@/app/types/api";
import TextField from "@mui/material/TextField";
import { RecipeCollection as PRecipeCollection } from "@prisma/client";
import { API } from "@utils/api";
import { useRouter } from "next/navigation";
import SearchBarResultCard from "./SearchBarResultCard";

type RecipeCollection = Pick<
    PRecipeCollection,
    "id" | "avatar" | "title" | "recipeIDs"
>;

const fetchRecipes = async (query: string) => {
    const collections = await API.get<
        APIResponse<{ collections: RecipeCollection[] }>
    >("collection/search", { params: { q: query } });

    return collections.data;
};

const CollectionSearchBar = () => {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [options, setOptions] = useState<RecipeCollection[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (input === "") return;
        const timeout = setTimeout(() => {
            // fetch data from server and set options
            fetchRecipes(input)
                .then(res => {
                    if (res.status === "error") return setError(res.message);
                    setOptions(res.data.collections);
                    setError(null);
                })
                .catch(err => setError(err.message));
        }, 500);

        return () => clearTimeout(timeout);
    }, [input]);

    const handleOptionSelection: SearchBarProps<RecipeCollection>["onSelection"] =
        (_, collection) => {
            if (!collection) return;
            router.push(`/collection/${collection.id}`);
        };

    const handleInputChange: SearchBarProps<RecipeCollection>["onInputChange"] =
        (_, value, reason) => {
            if (reason !== "input") return;
            setInput(value);
        };

    const handleRenderingOfInput: SearchBarProps<RecipeCollection>["renderInput"] =
        params => (
            <TextField
                {...params}
                error={error !== null}
                helperText={error}
                variant="standard"
                placeholder="Search Your Collection..."
                fullWidth
            />
        );

    const handleRenderingOfOption: SearchBarProps<RecipeCollection>["renderOption"] =
        (props, option) => {
            return <SearchBarResultCard {...props} collection={option} />;
        };

    return (
        <SearchBar<RecipeCollection>
            onSelection={handleOptionSelection}
            onInputChange={handleInputChange}
            renderInput={handleRenderingOfInput}
            renderOption={handleRenderingOfOption}
            getOptionLabel={option => option.title}
            noOptionsText="No collections found, maybe try other keywords?"
            options={options}
            inputVal={input}
        />
    );
};

export default CollectionSearchBar;
