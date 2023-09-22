import PaginatedCarousel from "@components/Collection/PaginatedCarousel";
import { Prisma } from "@prisma/client";
import { prisma } from "@utils/db";

export const COLLECTION_SELECTOR = {
    id: true,
    avatar: true,
    desc: true,
    recipeIDs: true,
    title: true,
    createdAt: true,
} satisfies Prisma.RecipeCollectionSelect;

const ExplorePage = async () => {
    const collections = await prisma.recipeCollection.findMany({
        select: COLLECTION_SELECTOR,
    });
    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Explore all the Collections 🧑‍🍳
            </h1>
            <section>
                <PaginatedCarousel collections={collections} />
            </section>
        </>
    );
};

export default ExplorePage;
