import { prisma } from "@utils/db";
import { notFound } from "next/navigation";
import RecipeForm, {
    Props as RecipeFormProps,
} from "../../components/RecipeForm";
import {} from "../../components/RecipeForm/formSchema";

type Props = { params: { id: string } };

const RecipeEditPage = async ({ params }: Props) => {
    const recipe = await prisma.recipe.findUnique({ where: { id: params.id } });
    if (!recipe) return notFound();

    const handleRecipeSubmit: RecipeFormProps["onSubmit"] = async data => {};

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Update your recipe
            </h1>
            <RecipeForm recipe={recipe} onSubmit={} />
        </>
    );
};

export default RecipeEditPage;
