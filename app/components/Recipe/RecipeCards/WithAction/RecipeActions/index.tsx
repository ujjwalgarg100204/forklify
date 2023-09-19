"use client";

import { Recipe } from "@prisma/client";
import AddToCollection from "./AddToCollectionAction";
import BookmarkAction from "./BookmarkAction";

type Props = {
    recipe: Pick<Recipe, "id">;
};

const RecipeActions = ({ recipe }: Props) => {
    return (
        <>
            <BookmarkAction recipe={recipe} />
            <AddToCollection recipe={recipe} />
        </>
    );
};

export default RecipeActions;
