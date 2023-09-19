import Rating from "@mui/material/Rating";
import { Recipe } from "@prisma/client";

type Props = {
    recipe: Pick<Recipe, "ingredients" | "title"> & { rating: number };
};

const TitleSection = ({ recipe }: Props) => {
    const noOfIngredients = recipe.ingredients.length;
    return (
        <section className="px-4 pb-6 pt-1 sm:pt-2">
            <Rating
                name="read-only"
                value={recipe.rating}
                size="small"
                readOnly
            />
            <h6 className="text-lg leading-5 sm:text-2xl">{recipe.title}</h6>
            <p className="mt-1 text-xs text-light-green sm:mt-2 sm:text-sm">
                {noOfIngredients} ingredients
            </p>
        </section>
    );
};

export default TitleSection;
