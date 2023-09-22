"use client";

import { Button, ButtonOwnProps, CircularProgress } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RecipeFormSchema, TRecipeFormSchema } from "./formSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { green } from "@mui/material/colors";
import { Recipe } from "@prisma/client";
import HeaderInput from "./HeaderInput";
import IngredientsInput from "./IngredientsInput";
import NotesInput from "./NotesInput";
import NutritionInput from "./NutritionInput";
import StepsInput from "./StepsInput";
import TagsInput from "./TagsInput";

export type Props = {
    recipe: Omit<
        Recipe,
        "id" | "recipeCollectionIDs" | "createdAt" | "updatedAt" | "userID"
    >;
    onSubmit: (data: TRecipeFormSchema) => Promise<void>;
};

const RecipeForm = ({ recipe, onSubmit: parentOnSubmit }: Props) => {
    const defaultValue = {
        ...recipe,
        steps: recipe.steps.map(step => ({ step })),
        notes: recipe.notes.map(note => ({ note })),
        tags: recipe.tags.map(tag => ({ tag })),
        nutrition: (recipe.nutrition
            ? Object.values(recipe.nutrition).map(value => ({ value }))
            : Array(4).fill({ value: 0 })) as { value: number | null }[],
    };
    const formMethods = useForm<TRecipeFormSchema>({
        resolver: zodResolver(RecipeFormSchema),
        criteriaMode: "all",
        defaultValues: defaultValue,
    });

    const onSubmit: SubmitHandler<TRecipeFormSchema> = async data => {
        try {
            await parentOnSubmit(data);
        } catch (err) {
            formMethods.setError("root.server", {
                type: "manual",
                message: (err as Error).message,
            });
        }
    };

    let buttonColor: ButtonOwnProps["color"] = "secondary";
    if (formMethods.formState.errors.root?.server) buttonColor = "error";
    else if (formMethods.formState.isSubmitSuccessful) buttonColor = "success";

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

export default RecipeForm;
