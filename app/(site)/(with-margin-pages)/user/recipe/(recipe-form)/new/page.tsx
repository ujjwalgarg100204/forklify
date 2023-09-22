"use client";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import Title from "@components/UI/Title";
import { redirect, useRouter } from "next/navigation";
import createNewRecipe from "../actions/createNewRecipe";
import type { Props as RecipeFormProps } from "../components/RecipeForm";
import RecipeForm from "../components/RecipeForm";

const emptyRecipeObj = {
    avatar: "",
    category: "breakfast",
    cookTime: 0,
    desc: "",
    ingredients: [],
    notes: [],
    nutrition: null,
    prepTime: 0,
    region: "american",
    servings: 1,
    steps: [],
    tags: [],
    title: "",
} satisfies RecipeFormProps["recipe"];

const NewRecipePage = () => {
    const { user, dispatch } = useUserContext();
    const router = useRouter();

    if (!user) redirect("/login");

    const handleRecipeFormSubmission: RecipeFormProps["onSubmit"] =
        async recipe => {
            const res = await createNewRecipe(user.id, recipe);
            if (res.status === "error") throw new Error(res.message);
            const newRecipe = res.data.recipe;
            dispatch({
                type: "ADD_RECIPE",
                payload: { recipe: newRecipe },
            });
            router.push(`/recipe/${newRecipe.id}`);
        };

    return (
        <>
            <Title>New Recipe 🪄</Title>
            <RecipeForm
                recipe={emptyRecipeObj}
                onSubmit={handleRecipeFormSubmission}
            />
        </>
    );
};

export default NewRecipePage;
