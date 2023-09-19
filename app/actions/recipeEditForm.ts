"use server";

import { Recipe, RecipeCategory, RecipeRegion } from "@prisma/client";

import { prisma } from "@utils/db";
import { z } from "zod";
import { APIResponse } from "../types/api";

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

const recipeEditForm = async (
    recipeId: string,
    formData: RecipeFormSchema,
): Promise<APIResponse<{ recipe: Recipe }>> => {
    try {
        // check validity of data
        const data = RecipeFormSchema.parse(formData);

        // convert received data to prisma format
        const recipeObj = {
            ...data,
            steps: data.steps.map(s => s.step),
            notes: data.notes.map(n => n.note),
            tags: data.tags.map(t => t.tag),
            nutrition: {
                calories: data.nutrition[0].value,
                fat: data.nutrition[1].value,
                carb: data.nutrition[2].value,
                protein: data.nutrition[3].value,
            },
        };

        // update recipe and return response
        const res = await prisma.recipe.update({
            where: { id: recipeId },
            data: recipeObj,
        });

        return {
            status: "ok",
            data: { recipe: res },
            message: "Recipe updated successfully",
        };
    } catch (err) {
        return { status: "error", data: {}, message: (err as Error).message };
    }
};

export default recipeEditForm;
