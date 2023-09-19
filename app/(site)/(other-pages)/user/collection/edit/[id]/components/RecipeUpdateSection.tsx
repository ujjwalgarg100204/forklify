"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Recipe, RecipeCollection } from "@prisma/client";

import { deleteRecipeFromCollection } from "@/app/actions/collectionUpdateForm";
import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import Card from "@components/Recipe/RecipeCards/WithAction/Card";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    recipes: (Pick<
        Recipe,
        | "id"
        | "avatar"
        | "title"
        | "prepTime"
        | "cookTime"
        | "ingredients"
        | "userID"
        | "region"
    > & { rating: number })[];
    collectionId: string;
};

const RecipeUpdateSection = ({ recipes, collectionId }: Props) => {
    const { dispatch, recipesCollections, user } = useUserContext();
    if (!user) return <LoadingSpinner />;

    const currentCollection = recipesCollections.find(
        c => c.id === collectionId,
    ) as RecipeCollection;

    const isRemoved = (id: string) => !currentCollection.recipeIDs.includes(id);
    const handleDelete = (recipeId: string) => {
        return async () => {
            const res = await deleteRecipeFromCollection(
                recipeId,
                collectionId,
            );
            dispatch({
                type: "UPDATE_RECIPE_COLLECTION",
                payload: {
                    recipeCollectionId: collectionId,
                    recipeCollection: {
                        recipeIDs: currentCollection.recipeIDs.filter(
                            id => id !== recipeId,
                        ),
                    },
                },
            });
        };
    };
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {recipes.map(recipe => (
                <div
                    key={recipe.id}
                    className="group relative flex flex-col items-center justify-center gap-2"
                >
                    <Card recipe={recipe} />
                    {isRemoved(recipe.id) ? (
                        <div className="absolute inset-0 z-50 grid h-full w-full place-content-center rounded-lg backdrop-blur-md transition-all duration-300">
                            <p className="font-semibold tracking-widest text-rose-700">
                                Removed
                            </p>
                        </div>
                    ) : (
                        <div className="transition-all duration-300 lg:absolute lg:inset-0 lg:z-50 lg:hidden lg:h-full lg:w-full lg:place-content-center lg:rounded-lg lg:backdrop-blur-md lg:group-hover:grid">
                            <Tooltip title="Remove from collection">
                                <IconButton
                                    color="error"
                                    sx={{
                                        backgroundColor: { md: "#28231D" },
                                        "&:hover": {
                                            backgroundColor: { md: "#160D08" },
                                        },
                                    }}
                                    onClick={handleDelete(recipe.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RecipeUpdateSection;
