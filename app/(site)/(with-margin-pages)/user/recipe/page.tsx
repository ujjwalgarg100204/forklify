import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import RecipeUserCard from "@components/Recipe/RecipeCards/RecipeUserCard";
import { RECIPE_SELECTOR } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import { average } from "@utils/array";
import { prisma } from "@utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UserRecipesPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    // get all recipes of user
    const recipes = await prisma.recipe.findMany({
        where: { userID: session.user.id },
        select: RECIPE_SELECTOR,
    });

    const recipesWithRating = recipes.map(recipe => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Your Recipes 🍜
            </h1>
            {recipesWithRating.length === 0 ? (
                <div className="text-center text-lg">
                    <p>
                        Oops... You gotta cook some recipes here before you can
                        see some here...🤩
                    </p>
                    <p className="font-bold text-orange">So get cooking 🍳</p>
                </div>
            ) : null}

            <div className="mx-auto flex flex-wrap justify-between gap-16 gap-y-12 px-12">
                {recipesWithRating.map(recipe => (
                    <RecipeUserCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </>
    );
};

export default UserRecipesPage;
