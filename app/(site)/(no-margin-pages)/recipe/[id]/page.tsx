import { prisma } from "@utils/db";
import CommentForm from "./components/CommentForm";
import CommentSection from "./components/CommentSection";
import IngredientSection from "./components/IngredientSection";
import Nutrition from "./components/Nutrition";
import RecipeHeader from "./components/RecipeHeader";
import RecommendedRecipesSection from "./components/RecommendedRecipesSection";
import StepsSection from "./components/StepsSection";
import TagsSection from "./components/TagsSection";

const RecipeDetailedViewPage = async ({
    params,
}: {
    params: { id: string };
}) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id: params.id },
        include: {
            comments: {
                select: {
                    rating: true,
                    comment: true,
                    user: { select: { name: true, image: true } },
                },
            },
        },
    });
    if (recipe === null) throw new Error("Recipe not found");

    const rating =
        recipe.comments
            .map(comment => comment.rating)
            .reduce((a, b) => a + b, 0) / recipe.comments.length;

    return (
        <main className="mt-8 space-y-6 divide-y-2 divide-gray-200 md:mt-0">
            <RecipeHeader {...recipe} rating={rating} />
            <section className="flex flex-col gap-10 p-4 lg:px-16">
                <TagsSection {...recipe} />
                <div className="space-y-10 md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-2 md:items-start md:justify-start md:gap-10 md:space-y-0">
                    <IngredientSection {...recipe} />
                    <Nutrition {...recipe.nutrition} />
                    <StepsSection {...recipe} />
                </div>
            </section>

            <section className="space-y-10 px-4 py-8 md:grid md:grid-cols-2 md:space-y-0 md:px-24">
                <CommentSection comments={recipe.comments} />
                <CommentForm recipe={recipe} />
            </section>
            <RecommendedRecipesSection />
        </main>
    );
};

export const dynamicParams = true;
export const revalidate = 24 * 60 * 60; // 24 hours
export default RecipeDetailedViewPage;
