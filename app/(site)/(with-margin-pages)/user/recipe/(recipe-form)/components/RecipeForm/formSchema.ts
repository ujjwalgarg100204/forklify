import { RecipeCategory, RecipeRegion } from "@prisma/client";

import { z } from "zod";

export const RecipeFormSchema = z.object({
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

export type TRecipeFormSchema = z.infer<typeof RecipeFormSchema>;
