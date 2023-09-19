import { prisma } from "@utils/db";
import { notFound } from "next/navigation";
import RecipeUpdateForm from "./components";

type Props = { params: { id: string } };

const RecipeEditPage = async ({ params }: Props) => {
    const recipe = await prisma.recipe.findUnique({ where: { id: params.id } });
    if (!recipe) return notFound();

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Update your recipe
            </h1>
            <RecipeUpdateForm recipe={recipe} />
        </>
    );
};

export default RecipeEditPage;
