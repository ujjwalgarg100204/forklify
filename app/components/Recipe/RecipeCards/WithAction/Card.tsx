"use client";

import type { Recipe } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ImageSection from "./ImageSection";
import RecipeActions from "./RecipeActions";
import TitleSection from "./TitleSection";

type Props = {
    recipe: Pick<
        Recipe,
        | "id"
        | "avatar"
        | "title"
        | "prepTime"
        | "cookTime"
        | "ingredients"
        | "userID"
        | "region"
    > & { rating: number };
};

const Card = ({ recipe }: Props) => {
    const { status } = useSession();
    return (
        <article className="relative flex min-w-[14rem] max-w-[18rem] flex-col gap-2 rounded-lg bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            {status === "authenticated" ? (
                <section className="absolute -right-4 -top-4 z-10 flex max-w-fit flex-col gap-4 transition-all duration-300">
                    <RecipeActions recipe={recipe} />
                </section>
            ) : null}
            <Link href={`/recipe/${recipe.id}`} className="">
                <ImageSection recipe={recipe} />
                <TitleSection recipe={recipe} />
            </Link>
        </article>
    );
};

export default Card;
