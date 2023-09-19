"use server";

import { RecipeCollection } from "@prisma/client";
import { prisma } from "@utils/db";
import { APIResponse } from "../types/api";

export const newCollection = async (
    collection: Pick<RecipeCollection, "avatar" | "desc" | "title" | "userID">,
): Promise<APIResponse<{ collection: RecipeCollection }>> => {
    try {
        const newCollection = await prisma.recipeCollection.create({
            data: collection,
        });
        return {
            status: "ok",
            data: { collection: newCollection },
            message: "Collection created successfully",
        };
    } catch (err) {
        return {
            status: "error",
            data: {},
            message: (err as Error).message,
        };
    }
};

const collectionUpdateForm = async (
    collectionId: string,
    collection: Partial<Pick<RecipeCollection, "avatar" | "desc" | "title">>,
): Promise<APIResponse<{ collection: RecipeCollection }>> => {
    try {
        const updatedCollection = await prisma.recipeCollection.update({
            where: { id: collectionId },
            data: collection,
        });
        return {
            status: "ok",
            data: { collection: updatedCollection },
            message: "Collection updated successfully",
        };
    } catch (err) {
        return {
            status: "error",
            data: {},
            message: (err as Error).message,
        };
    }
};

export const deleteRecipeFromCollection = async (
    recipeId: string,
    collectionId: string,
): Promise<APIResponse<{ collection: RecipeCollection }>> => {
    try {
        const collection = await prisma.recipeCollection.update({
            where: { id: collectionId },
            data: {
                recipes: {
                    disconnect: {
                        id: recipeId,
                    },
                },
            },
        });
        return {
            status: "ok",
            data: { collection },
            message: "Recipe removed from collection",
        };
    } catch (err) {
        return {
            status: "error",
            data: {},
            message: (err as Error).message,
        };
    }
};

export default collectionUpdateForm;
