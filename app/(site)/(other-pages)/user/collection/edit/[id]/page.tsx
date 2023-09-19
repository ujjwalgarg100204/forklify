import { average } from "@utils/array";
import { prisma } from "@utils/db";
import { getServerSession } from "next-auth";
import CollectionUpdateForm from "./components/CollectionUpdateForm";
import RecipeUpdateSection from "./components/RecipeUpdateSection";

type Props = {
    params: { id: string };
};

const CollectionEditPage = async ({ params }: Props) => {
    const session = await getServerSession();
    if (!session) throw new Error("Not authorized or authenticated");
    const collection = await prisma.recipeCollection.findUnique({
        where: { id: params.id, userID: session.user.id },
        include: {
            recipes: {
                select: {
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
                },
            },
        },
    });
    if (!collection) throw new Error("Collection not found");

    const recipesWithRating = collection.recipes.map(recipe => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));

    return (
        <>
            <h1 className="text-center text-4xl font-bold">
                Edit Collection ✏️
            </h1>
            <CollectionUpdateForm collection={collection} />
            <hr className="text-gray-400" />
            <RecipeUpdateSection
                recipes={recipesWithRating}
                collectionId={collection.id}
            />
        </>
    );
};

export default CollectionEditPage;
