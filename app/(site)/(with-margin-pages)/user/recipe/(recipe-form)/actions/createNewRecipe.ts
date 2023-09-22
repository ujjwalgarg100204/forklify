"use server";

import {
    RecipeFormSchema,
    TRecipeFormSchema,
} from "../components/RecipeForm/formSchema";

import { APIResponse } from "@/app/types/api";
import { Recipe } from "@prisma/client";
import { prisma } from "@utils/db";

const toPrismaRecipeFormat = (
    data: TRecipeFormSchema,
): Omit<
    Recipe,
    "id" | "recipeCollectionIDs" | "createdAt" | "updatedAt" | "userID"
> => ({
    ...data,
    steps: data.steps.map(s => s.step),
    notes: data.notes.map(n => n.note),
    tags: data.tags.map(t => t.tag),
    nutrition: {
        calories: data.nutrition[0].value,
        fat: data.nutrition[1].value,
        carb: data.nutrition[2].value,
        protein: data.nutrition[3].value,
    },
});

const createNewRecipe = async (
    userId: string,
    recipe: TRecipeFormSchema,
): Promise<APIResponse<{ recipe: Recipe }>> => {
    try {
        // check validity of data
        const data = RecipeFormSchema.parse(recipe);
        // convert form data into prisma format
        const recipeObj = toPrismaRecipeFormat(data);
        // create recipe and return response
        const res = await prisma.recipe.create({
            data: { ...recipeObj, userID: userId },
        });

        return {
            status: "ok",
            data: { recipe: res },
            message: "Recipe created successfully",
        };
    } catch (err) {
        return {
            status: "error",
            data: {},
            message: (err as Error).message,
        };
    }
};

export default createNewRecipe;
