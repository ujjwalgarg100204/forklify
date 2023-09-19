import SearchIcon from "@mui/icons-material/Search";
import type { Recipe } from "@prisma/client";
import Image from "next/image";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLLIElement> & {
    recipe: Pick<Recipe, "id" | "avatar" | "title" | "category" | "region">;
};

const SearchBarResultCard = ({ recipe, ...props }: Props) => {
    return (
        <li
            {...props}
            className="cursor-pointer border-orange p-4"
            style={{ borderBottomWidth: "1px" }}
        >
            <div className="flex items-center gap-4">
                <SearchIcon
                    sx={{
                        fontSize: 36,
                        display: {
                            xs: "none",
                            md: "block",
                        },
                    }}
                    className="text-orange"
                />
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                        src={recipe.avatar}
                        alt={recipe.title}
                        className="object-cover object-center"
                        fill={true}
                    />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <h1 className="text-xl text-black">{recipe.title}</h1>
                    <p className="capitalize text-light-green">
                        {recipe.category}, {recipe.region}
                    </p>
                </div>
            </div>
        </li>
    );
};

export default SearchBarResultCard;
