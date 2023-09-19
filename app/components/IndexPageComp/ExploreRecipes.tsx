import Image from "next/image";
import RecipeSearchBar from "../Recipe/RecipeSearchBar";

const ExploreRecipes = () => {
    return (
        <section className="relative space-y-5 py-20" id="explore-section">
            <div className="absolute inset-0 -z-10 h-full w-full">
                <Image
                    src="/images/dishes/explore-recipes-section-dish.jpg"
                    className="h-full w-full object-cover object-center brightness-[.25]"
                    alt="background image"
                    height={400}
                    width={800}
                />
            </div>
            <main className="space-y-5 px-8 text-center text-white">
                <h1 className="text-4.5xl font-bold leading-snug md:text-5xl lg:text-6xl">
                    Explore Recipes
                </h1>
                <p className="mx-auto w-4/5 opacity-80 lg:text-lg">
                    Search recipe by pasting the name of the ingredient
                </p>
            </main>
            <div className="sm:mx-16 lg:mx-32 xl:mx-44">
                <RecipeSearchBar />
            </div>
        </section>
    );
};

export default ExploreRecipes;
