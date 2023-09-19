import RecipeActions from "@components/Recipe/RecipeCards/WithAction/RecipeActions";
import Rating from "@mui/material/Rating";
import { Recipe } from "@prisma/client";
import Image from "next/image";

type Props = Pick<Recipe, "id" | "avatar" | "title" | "desc"> & {
    rating: number;
};

const RecipeHeader = ({ id, avatar, title, desc, rating }: Props) => {
    return (
        <section className="relative space-y-8 px-6 md:p-0">
            <div className="mx-auto h-52 w-52 overflow-hidden rounded-full border-8 border-white shadow-2xl md:relative md:-z-10 md:h-96 md:w-screen md:rounded-none md:border-none lg:h-[28rem]">
                <Image
                    src={avatar}
                    height={1000}
                    width={1000}
                    alt={title}
                    className="h-full w-full object-cover object-center md:absolute md:inset-0"
                />
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-white bg-white/60 px-6 py-5 shadow-inner backdrop-blur-2xl md:absolute md:bottom-12 md:left-12 md:space-y-4">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-center text-3xl font-bold text-gray-900">
                        {title}
                    </h1>
                    <Rating
                        name="read-only"
                        value={rating}
                        readOnly
                        sx={{ fontSize: { md: 24 } }}
                        size="small"
                    />
                </div>
                <p className="text-sm md:text-base">{desc}</p>

                <div className="flex gap-2">
                    <RecipeActions recipe={{ id }} />
                </div>
            </div>
        </section>
    );
};

export default RecipeHeader;
