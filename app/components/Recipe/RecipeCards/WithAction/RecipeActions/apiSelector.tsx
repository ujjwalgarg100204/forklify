import { Prisma } from "@prisma/client";

export const RECIPE_SELECTOR = {
    id: true,
    title: true,
    ingredients: true,
    region: true,
    avatar: true,
    prepTime: true,
    cookTime: true,
    category: true,
    userID: true,
    comments: { select: { rating: true } },
    desc: true,
} satisfies Prisma.RecipeSelect;

export type RecipeActionCardPayload = Prisma.RecipeGetPayload<{
    select: typeof RECIPE_SELECTOR;
}>;
