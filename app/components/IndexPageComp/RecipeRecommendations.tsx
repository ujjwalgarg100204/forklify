import Card from "@components/Recipe/RecipeCards/WithoutAction/Card";
import Carousel from "@components/UI/Carousel";
import CarouselItem from "@components/UI/Carousel/CarouselItem";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { shuffleArray } from "@utils/array";
import { prisma } from "@utils/db";
import { v4 as uuidV4 } from "uuid";

const RecipeRecommendations = async () => {
    // shuffle result and send only first 20 results
    const recipes = shuffleArray(await prisma.recipe.findMany()).slice(0, 25);
    return (
        <section className="container mx-auto space-y-10 px-8">
            <h1 className="text-center text-3xl font-bold text-green md:text-4xl lg:text-6xl">
                Recommendations
            </h1>
            <Carousel
                naturalSlideHeight={10}
                naturalSlideWidth={10}
                totalSlides={recipes.length}
                backButton={<WestRoundedIcon className="text-2xl" />}
                frontButton={<EastRoundedIcon className="text-2xl" />}
                isPlaying
            >
                {recipes.map((recipe, i) => (
                    <CarouselItem index={i} key={uuidV4()}>
                        <div className="p-4">
                            <Card recipe={recipe} />
                        </div>
                    </CarouselItem>
                ))}
            </Carousel>
        </section>
    );
};

export const revalidate = 60 * 60; // 1 hour
export default RecipeRecommendations;
