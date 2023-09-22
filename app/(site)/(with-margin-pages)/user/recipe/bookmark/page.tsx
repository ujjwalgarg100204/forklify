import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Card from "@components/Recipe/RecipeCards/WithAction/Card";
import { RECIPE_SELECTOR } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import { average } from "@utils/array";
import { prisma } from "@utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UserSavedPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    // get all bookmarks of user
    const bookmarks = await prisma.bookmark.findMany({
        where: { userID: session.user.id },
        include: {
            recipe: {
                select: RECIPE_SELECTOR,
            },
        },
    });

    const recipesWithRating = bookmarks.map(({ recipe }) => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Your Bookmarks 📚
            </h1>
            <div className="mx-auto grid grid-cols-1 place-items-stretch gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recipesWithRating.map(recipe => (
                    <div
                        key={recipe.id}
                        className="grid w-full place-content-center sm:block"
                    >
                        <Card recipe={recipe} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserSavedPage;
