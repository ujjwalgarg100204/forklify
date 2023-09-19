import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { ids: string[] } },
) => {
    const [recipeId, collectionId] = params.ids;
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(
            {
                status: "error",
                data: {},
                message:
                    "User needs to be logged in to add recipe to collection",
            },
            { status: 401 },
        );

    try {
        const updatedCollection = await prisma.recipeCollection.update({
            where: { id: collectionId, userID: session.user.id },
            data: {
                recipeIDs: { push: recipeId },
                recipes: {
                    update: {
                        where: { id: recipeId },
                        data: {
                            recipeCollectionIDs: {
                                push: collectionId,
                            },
                        },
                    },
                },
            },
        });
        return NextResponse.json(
            {
                status: "success",
                data: { collection: updatedCollection },
                message: "Recipe added to collection",
            },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json(
            {
                status: "error",
                data: {},
                message: (err as Error).message,
            },
            { status: 500 },
        );
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { ids: string[] } },
) => {
    const [recipeId, collectionId] = params.ids;
    const session = await getServerSession();
    if (!session)
        return NextResponse.json(
            {
                status: "error",
                data: {},
                message:
                    "User needs to be logged in to add a recipe to collection",
            },
            { status: 401 },
        );

    try {
        const oldRecipes = await prisma.recipeCollection.findUnique({
            where: { id: collectionId },
            select: { recipeIDs: true },
        });
        const oldRecipeCollections = await prisma.recipe.findUnique({
            where: { id: recipeId },
            select: { recipeCollectionIDs: true },
        });
        if (!(oldRecipes && oldRecipeCollections))
            throw new Error("Recipe Id or Collection Id is not valid");

        const updatedCollection = prisma.recipeCollection.update({
            where: { id: collectionId },
            data: {
                recipeIDs: {
                    set: oldRecipes.recipeIDs.filter(id => id !== recipeId),
                },
            },
        });
        const updatedRecipe = prisma.recipe.update({
            where: { id: recipeId },
            data: {
                recipeCollectionIDs: {
                    set: oldRecipeCollections.recipeCollectionIDs.filter(
                        id => id !== collectionId,
                    ),
                },
            },
        });
        const res = await prisma.$transaction([
            updatedCollection,
            updatedRecipe,
        ]);
        return NextResponse.json({
            status: "ok",
            data: { collection: res[0] },
            message: "Recipe removed from collection",
        });
    } catch (err) {
        return NextResponse.json({
            status: "error",
            data: {},
            message: (err as Error).message,
        });
    }
};
