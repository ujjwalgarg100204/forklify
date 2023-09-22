"use client";

import {} from "../../components/RecipeForm/formSchema";

import { notFound, useRouter } from "next/navigation";
import RecipeForm, {
    Props as RecipeFormProps,
} from "../../components/RecipeForm";

import recipeEditForm from "@/app/actions/recipeEditForm";
import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";

type Props = { params: { id: string } };

const RecipeEditPage = ({ params }: Props) => {
    const { dispatch, recipes } = useUserContext();
    const router = useRouter();
    const recipe = recipes.find(recipe => recipe.id === params.id);
    if (!recipe) return notFound();

    const handleRecipeSubmit: RecipeFormProps["onSubmit"] = async data => {
        const res = await recipeEditForm(recipe.id, data);
        if (res.status === "error") throw new Error(res.message);
        dispatch({
            type: "UPDATE_RECIPE",
            payload: { recipeId: recipe.id, recipe: res.data.recipe },
        });
        router.push(`/recipe/${recipe.id}`);
    };

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Update your recipe
            </h1>
            <RecipeForm recipe={recipe} onSubmit={handleRecipeSubmit} />
        </>
    );
};

export default RecipeEditPage;
