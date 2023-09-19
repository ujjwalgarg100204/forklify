import Card from "@components/Recipe/RecipeCards/WithoutAction/Card";
import Carousel from "@components/UI/Carousel";
import CarouselItem from "@components/UI/Carousel/CarouselItem";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { shuffleArray } from "@utils/array";
import { prisma } from "@utils/db";
import { v4 as uuidV4 } from "uuid";

const RecommendedRecipesSection = async () => {
    const recommendedRecipes = await prisma.recipe.findMany({
        take: 10,
        skip: 5,
    });
    const shuffledArr = shuffleArray(recommendedRecipes);

    return (
        <section className="space-y-4 px-4 pt-8 md:mb-12 md:px-20">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Recommended Recipes
            </h1>
            <Carousel
                naturalSlideHeight={13}
                naturalSlideWidth={10}
                totalSlides={recommendedRecipes.length}
                backButton={<WestRoundedIcon className="text-2xl" />}
                frontButton={<EastRoundedIcon className="text-2xl" />}
            >
                {shuffledArr.map((recipe, i) => (
                    <CarouselItem index={i} key={uuidV4()}>
                        <div className="p-6">
                            <Card recipe={recipe} />
                        </div>
                    </CarouselItem>
                ))}
            </Carousel>
        </section>
    );
};

export default RecommendedRecipesSection;
