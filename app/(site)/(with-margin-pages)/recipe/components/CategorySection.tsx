import Card from "@components/Recipe/RecipeCards/WithAction/Card";
import Carousel from "@components/UI/Carousel";
import CarouselItem from "@components/UI/Carousel/CarouselItem";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Recipe } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import CategoryTitle from "./CategoryTitle";

type Props = {
    category: string;
    recipes: (Pick<
        Recipe,
        | "id"
        | "avatar"
        | "title"
        | "prepTime"
        | "userID"
        | "cookTime"
        | "ingredients"
        | "region"
    > & { rating: number })[];
};

const CategorySection = ({ category, recipes }: Props) => {
    return (
        <section className="space-y-2" id={category}>
            <CategoryTitle title={category} />
            <Carousel
                naturalSlideHeight={13}
                naturalSlideWidth={10}
                totalSlides={recipes.length}
                backButton={<WestRoundedIcon className="text-2xl" />}
                frontButton={<EastRoundedIcon className="text-2xl" />}
            >
                {recipes.map((recipe, i) => (
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

export default CategorySection;
