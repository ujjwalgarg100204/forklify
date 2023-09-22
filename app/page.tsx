import ExploreRecipes from "@components/IndexPageComp/ExploreRecipes";
import HeroSection from "@components/IndexPageComp/HeroSection";
import HowItWorks from "@components/IndexPageComp/HowItWorks";
import RecipeCategories from "@components/IndexPageComp/RecipeCategories/RecipeCategories";
import RecipeRecommendations from "@components/IndexPageComp/RecipeRecommendations";

const HomePage = () => {
    return (
        <>
            <main className="my-16 space-y-16">
                <HeroSection />
                <HowItWorks />
                <ExploreRecipes />
                <RecipeCategories />
                <RecipeRecommendations />
            </main>
        </>
    );
};

export default HomePage;
