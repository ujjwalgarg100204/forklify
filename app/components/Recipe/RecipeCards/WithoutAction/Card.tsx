import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Recipe } from "@prisma/client";
import { truncWithEllipsis } from "@utils/string";
import Image from "next/image";
import Link from "next/link";

type Props = {
    recipe: Pick<
        Recipe,
        | "id"
        | "avatar"
        | "title"
        | "prepTime"
        | "recipeCollectionIDs"
        | "cookTime"
        | "desc"
    >;
};
const Card = ({ recipe }: Props) => {
    const desc = truncWithEllipsis(recipe.desc);
    const totalCookTime = recipe.prepTime + recipe.cookTime;

    return (
        <Link href={`/recipe/${recipe.id}`}>
            <article className={"flex h-56 flex-col gap-2 lg:h-72"}>
                <div className="relative flex flex-1 items-end justify-between p-2 lg:p-4">
                    <Image
                        src={recipe.avatar}
                        alt={recipe.title}
                        className={
                            "absolute inset-0 -z-10 h-full w-full rounded-xl object-cover object-center brightness-[.6]"
                        }
                        fill={true}
                        sizes="(max-width: 768px) 100px, (max-width: 1200px) 300px, 300px"
                    />
                    <div className="flex items-center justify-center gap-1 text-sm text-white lg:text-base">
                        <FavoriteBorderOutlinedIcon />
                        <span className={"font-[600]"}>
                            {recipe.recipeCollectionIDs.length}k
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-white lg:text-base">
                        <AccessTimeOutlinedIcon />
                        <span className={"font-[600]"}>{totalCookTime}min</span>
                    </div>
                </div>

                <p className="h-12 overflow-hidden text-ellipsis text-center text-green md:h-16">
                    {desc}
                </p>
            </article>
        </Link>
    );
};

export default Card;
