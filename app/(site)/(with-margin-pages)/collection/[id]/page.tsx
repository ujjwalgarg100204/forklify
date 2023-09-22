import { RECIPE_SELECTOR } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import { average } from "@utils/array";
import { prisma } from "@utils/db";
import CollectionHeader from "./components/CollectionHeader";
import RecipeCarousel from "./components/RecipeCarousel";

type Props = {
    params: { id: string };
};
const CollectionDetailedViewPage = async ({ params }: Props) => {
    const collection = await prisma.recipeCollection.findUnique({
        where: { id: params.id },
        include: {
            user: { select: { image: true, name: true } },
            recipes: {
                select: RECIPE_SELECTOR,
            },
        },
    });
    if (collection === null) throw new Error("Recipe not found");

    const recipesWithRating = collection.recipes.map(recipe => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));

    return (
        <>
            <CollectionHeader collection={collection} />
            <RecipeCarousel recipes={recipesWithRating} />
        </>
    );
};

export const dynamicParams = true;
export const revalidate = 24 * 60 * 60; // 24 hours
export default CollectionDetailedViewPage;
