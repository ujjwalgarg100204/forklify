import { RECIPE_SELECTOR } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import { average } from "@utils/array";
import { prisma } from "@utils/db";
import RecipeCarouselWithCategory from "../components/RecipeCarouselWithCategory";

const PopularPage = async () => {
    const recipes = await prisma.recipe.findMany({
        select: RECIPE_SELECTOR,
    });
    const recipesWithRating = recipes.map(recipe => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));

    // sort the recipes by popularity: rating
    recipesWithRating.sort((a, b) => b.rating - a.rating);

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Popular recipes which you will love 💓
            </h1>
            <section>
                <RecipeCarouselWithCategory recipes={recipesWithRating} />
            </section>
        </>
    );
};

export const revalidate = 60 * 60; // 1 hour
export default PopularPage;
