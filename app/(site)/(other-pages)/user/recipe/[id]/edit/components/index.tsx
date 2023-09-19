"use client";

import { Button, CircularProgress } from "@mui/material";
import { Recipe, RecipeCategory, RecipeRegion } from "@prisma/client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import recipeEditForm from "@/app/actions/recipeEditForm";
import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { green } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { z } from "zod";
import HeaderInput from "./HeaderInput";
import IngredientsInput from "./IngredientsInput";
import NotesInput from "./NotesInput";
import NutritionInput from "./NutritionInput";
import StepsInput from "./StepsInput";
import TagsInput from "./TagsInput";

type Props = {
    recipe: Recipe;
};

const RecipeFormSchema = z.object({
    title: z.string().min(3).max(50),
    desc: z.string().min(3).max(500),
    avatar: z.string().url(),
    region: z.nativeEnum(RecipeRegion),
    ingredients: z.array(
        z.object({
            name: z.string(),
            quantity: z.object({
                num: z
                    .number()
                    .or(z.string().regex(/\d+/).transform(Number))
                    .refine(n => n >= 0),
                suffix: z.string(),
            }),
        }),
    ),
    prepTime: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine(n => n >= 0),
    cookTime: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine(n => n >= 0),
    category: z.nativeEnum(RecipeCategory),
    steps: z.array(z.object({ step: z.string().min(3).max(500) })),
    notes: z.array(z.object({ note: z.string().min(3).max(500) })),
    tags: z.array(z.object({ tag: z.string().min(3).max(20) })),
    nutrition: z.array(
        z.object({
            value: z
                .number()
                .or(z.string().regex(/\d+/).transform(Number))
                .refine(n => n >= 0)
                .nullable(),
        }),
    ),
    servings: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine(n => n >= 0),
});

export type RecipeFormSchema = z.infer<typeof RecipeFormSchema>;

const RecipeUpdateForm = ({ recipe }: Props) => {
    const defaultValue = {
        ...recipe,
        steps: recipe.steps.map(step => ({ step })),
        notes: recipe.notes.map(note => ({ note })),
        tags: recipe.tags.map(tag => ({ tag })),
        nutrition: (recipe.nutrition
            ? Object.values(recipe.nutrition).map(value => ({ value }))
            : Array(4).fill({ value: 0 })) as { value: number | null }[],
    };
    const formMethods = useForm<RecipeFormSchema>({
        resolver: zodResolver(RecipeFormSchema),
        criteriaMode: "all",
        defaultValues: defaultValue,
    });
    const { dispatch } = useUserContext();
    const router = useRouter();

    const onSubmit: SubmitHandler<RecipeFormSchema> = async data => {
        try {
            const res = await recipeEditForm(recipe.id, data);
            if (res.status === "error") throw new Error(res.message);
            dispatch({
                type: "UPDATE_RECIPE",
                payload: { recipeId: recipe.id, recipe: res.data.recipe },
            });
            router.push(`/recipe/${recipe.id}`);
        } catch (err) {
            formMethods.setError("root.server", {
                type: "manual",
                message: (err as Error).message,
            });
        }
    };

    const buttonColor = formMethods.formState.errors.root?.server
        ? "error"
        : formMethods.formState.isSubmitSuccessful
        ? "success"
        : "secondary";
    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={formMethods.handleSubmit(onSubmit)}
                className="space-y-16 md:px-16 lg:px-20"
            >
                <HeaderInput />
                <TagsInput />
                <IngredientsInput />
                <NutritionInput />
                <StepsInput />
                <NotesInput />
                <div className="relative grid place-content-center">
                    <Button
                        color={buttonColor}
                        type="submit"
                        variant="contained"
                        disabled={formMethods.formState.isSubmitting}
                        sx={{
                            ...(formMethods.formState.isSubmitSuccessful && {
                                bgcolor: green[500],
                                "&:hover": {
                                    bgcolor: green[700],
                                },
                            }),
                        }}
                    >
                        Submit
                    </Button>
                    {formMethods.formState.isSubmitting && (
                        <CircularProgress
                            size={32}
                            sx={{
                                color: green[500],
                                position: "absolute",
                                top: "5%",
                                left: "48.5%",
                                zIndex: 1,
                            }}
                        />
                    )}
                </div>
            </form>
        </FormProvider>
    );
};
export default RecipeUpdateForm;
