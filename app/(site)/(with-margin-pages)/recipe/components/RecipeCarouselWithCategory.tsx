import { Recipe } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { categorizeRecipes } from "../utils";
import CategorySection from "./CategorySection";

type Props = {
    recipes: (Pick<
        Recipe,
        | "id"
        | "avatar"
        | "title"
        | "prepTime"
        | "cookTime"
        | "userID"
        | "ingredients"
        | "category"
        | "region"
    > & { rating: number })[];
};
const RecipeCarouselWithCategory = ({ recipes }: Props) => {
    const categorizedRecipes = categorizeRecipes(recipes);
    return (
        <section className="sm:space-y-4 md:space-y-12">
            {Object.entries(categorizedRecipes).map(([category, recipes]) => (
                <CategorySection
                    key={uuidV4()}
                    category={category}
                    recipes={recipes}
                />
            ))}
        </section>
    );
};

export default RecipeCarouselWithCategory;
