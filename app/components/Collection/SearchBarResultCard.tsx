import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import orange from "@mui/material/colors/orange";
import type { RecipeCollection } from "@prisma/client";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLLIElement> & {
    collection: Pick<RecipeCollection, "id" | "avatar" | "title" | "recipeIDs">;
};

const SearchBarResultCard = ({ collection, ...props }: Props) => {
    return (
        <li
            {...props}
            className="cursor-pointer border-orange p-2"
            style={{ borderBottomWidth: "1px" }}
        >
            <div className="flex items-center justify-center gap-4">
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
                <div className="relative grid h-16 w-16 place-content-center overflow-hidden rounded-full">
                    <Avatar
                        src={collection.avatar ?? undefined}
                        alt={collection.title}
                        sx={{
                            bgcolor: orange[700],
                        }}
                    />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <h1 className="text-xl text-black">{collection.title}</h1>
                    <p className="capitalize text-light-green">
                        {collection.recipeIDs.length} recipes
                    </p>
                </div>
            </div>
        </li>
    );
};

export default SearchBarResultCard;
