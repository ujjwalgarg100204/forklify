import { average, shuffleArray } from "@utils/array";

import { RECIPE_SELECTOR } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import { prisma } from "@utils/db";
import RecipeCarouselWithCategory from "../components/RecipeCarouselWithCategory";

const ExplorePage = async () => {
    const recipes = await prisma.recipe.findMany({
        select: RECIPE_SELECTOR,
    });
    const recipesWithRating = recipes.map(recipe => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));

    const shuffledRecipes = shuffleArray(recipesWithRating);

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Explore all the recipes 🧑‍🍳
            </h1>
            <section>
                <RecipeCarouselWithCategory recipes={shuffledRecipes} />
            </section>
        </>
    );
};

export const revalidate = 60 * 60; // 1 hour
export default ExplorePage;
