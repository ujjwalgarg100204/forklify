import ExploreRecipes from "@components/IndexPageComp/ExploreRecipes";
import HeroSection from "@components/IndexPageComp/HeroSection";
import HowItWorks from "@components/IndexPageComp/HowItWorks";
import RecipeCategories from "@components/IndexPageComp/RecipeCategories/RecipeCategories";
import RecipeRecommendations from "@components/IndexPageComp/RecipeRecommendations";
import Toolbar from "@mui/material/Toolbar";

const HomePage = () => {
    return (
        <>
            <section className="relative h-[100vh] min-h-[30rem] md:-mt-[2.2rem]">
                <Toolbar />
                <HeroSection />
            </section>
            <main className="my-16 space-y-16">
                <HowItWorks />
                <ExploreRecipes />
                <RecipeCategories />
                <RecipeRecommendations />
            </main>
        </>
    );
};

export default HomePage;
