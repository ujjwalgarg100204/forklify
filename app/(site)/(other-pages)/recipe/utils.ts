import type { Recipe, RecipeCategory } from "@prisma/client";

export const categorizeRecipes = <T extends Pick<Recipe, "category">>(
    recipes: T[],
) => {
    // categorize all recipes according to their category and put them in obj
    // where key is recipe category and key is list of recipes of that category
    const categorizedRecipes = {} as Record<RecipeCategory, typeof recipes>;

    recipes.forEach(recipe => {
        // if recipe category is already present in categorizedRecipes then push recipe in that category
        if (Object.keys(categorizedRecipes).includes(recipe.category))
            categorizedRecipes[recipe.category].push(recipe);
        // else create new category and put recipe in that category
        else categorizedRecipes[recipe.category] = [recipe];
    });

    return categorizedRecipes;
};
