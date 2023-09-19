"use client";

import { RECIPE_FILTERS } from "@/app/data";
import { APIResponse } from "@/app/types/api";
import { RecipeActionCardPayload } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import Button from "@mui/material/Button";
import axios from "axios";
import { FormEvent } from "react";
import { v4 as uuidV4 } from "uuid";
import FilterGroup from "./FilterGroup";

type Props = {
    onFetchResults: (results: RecipeActionCardPayload[]) => void;
};

const FilterSection = ({ onFetchResults }: Props) => {
    const handleFormSubmission = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const d = new FormData(ev.currentTarget);
        const res = await axios<
            APIResponse<{ recipes: RecipeActionCardPayload[] }>
        >({
            method: "post",
            url: "/api/recipe/search",
            data: d,
            headers: { "Content-Type": "multipart/form-data" },
        });
        // FIXME: Handle error here
        if (res.data.status === "error") throw new Error(res.data.message);
        onFetchResults(res.data.data.recipes);
    };

    return (
        <form
            onSubmit={handleFormSubmission}
            className="grid grid-cols-2 justify-center gap-x-4 gap-y-8 px-6 md:px-12 lg:grid-cols-4 lg:px-20"
        >
            {RECIPE_FILTERS.map(filter => (
                <FilterGroup key={uuidV4()} {...filter} />
            ))}

            <Button
                variant="contained"
                sx={{ px: "10%" }}
                color="secondary"
                type="submit"
            >
                Show Results
            </Button>
        </form>
    );
};

export default FilterSection;
