import { Recipe } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

type Props = {
    recipe: Pick<
        Recipe,
        "id" | "avatar" | "title" | "prepTime" | "cookTime" | "region"
    >;
};
const ImageSection: FC<Props> = ({ recipe }: Props) => {
    const totalCookTime = recipe.prepTime + recipe.cookTime;
    return (
        <section className="relative flex h-40 max-h-[18rem] w-full max-w-[18rem] flex-col items-start justify-between p-4 md:h-56 lg:h-64">
            <Image
                src={recipe.avatar}
                alt={recipe.title}
                className="absolute inset-0 z-0 h-full w-full rounded-t-lg object-cover object-center"
                width={400}
                height={400}
            />
            <p className="z-10 rounded-full bg-light-green px-2 py-1 text-sm capitalize text-white sm:text-base">
                {recipe.region}
            </p>
            <p className="z-10 rounded-full bg-[rgba(0,0,0,0.4)] px-2 py-1 text-xs font-semibold text-white sm:text-sm">
                {totalCookTime} mins
            </p>
        </section>
    );
};

export default ImageSection;
