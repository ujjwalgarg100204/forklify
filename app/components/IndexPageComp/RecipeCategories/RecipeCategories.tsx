import { RECIPE_CATEGORIES } from "@/app/data";
import { v4 as uuidV4 } from "uuid";
import RecipeCategoryListItem from "./RecipeCategoryListItem";

const RecipeCategories = () => {
    return (
        <section className="container mx-auto space-y-6 px-8">
            <h1 className="text-center text-4.5xl font-bold text-green md:text-5xl lg:text-6xl">
                Categories
            </h1>
            <p className="text-center lg:text-lg">
                A large selection of dishes for cooking
            </p>
            <ul className="flex flex-wrap justify-center gap-5 lg:gap-8">
                {RECIPE_CATEGORIES.map(category => (
                    <RecipeCategoryListItem key={uuidV4()} {...category} />
                ))}
            </ul>
        </section>
    );
};

export default RecipeCategories;
