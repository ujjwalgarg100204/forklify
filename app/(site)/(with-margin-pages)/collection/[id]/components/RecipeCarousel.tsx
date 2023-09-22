import Card from "@components/Recipe/RecipeCards/WithAction/Card";
import Carousel from "@components/UI/Carousel";
import CarouselItem from "@components/UI/Carousel/CarouselItem";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Recipe } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

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
};

const RecipeCarousel = ({ recipes }: Props) => {
    return (
        <section className="flex flex-col gap-2 lg:gap-4">
            <h2 className="text-xl font-bold leading-snug text-green md:text-2xl lg:text-3xl">
                Recipes in the Collection
            </h2>
            <Carousel
                naturalSlideHeight={13}
                naturalSlideWidth={10}
                totalSlides={recipes.length}
                backButton={<WestRoundedIcon className="text-2xl" />}
                frontButton={<EastRoundedIcon className="text-2xl" />}
            >
                {recipes.map((recipe, i) => (
                    <CarouselItem index={i} key={uuidV4()}>
                        <div className="p-5">
                            <Card recipe={recipe} />
                        </div>
                    </CarouselItem>
                ))}
            </Carousel>
        </section>
    );
};

export default RecipeCarousel;
