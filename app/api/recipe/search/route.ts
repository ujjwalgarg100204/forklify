import { RecipeCategory, RecipeRegion } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@utils/db";

const filters = ["time", "category", "diet", "region"] as const;

const formDataToObj = (formData: FormData) => {
    const data: { [Key in (typeof filters)[number]]: string[] } = {
        time: [],
        category: [],
        diet: [],
        region: [],
    };

    filters.forEach(filter => {
        data[filter] = Array.from(formData.getAll(filter)).map(val =>
            val.toString(),
        );
    });

    return data;
};

export const POST = async (req: NextRequest) => {
    try {
        const filterArgs = formDataToObj(await req.formData());
        // clean time input
        const cookTime =
            filterArgs.time
                .map(time => +time)
                .reduce((acc, curr) => (acc > curr ? acc : curr), 0) ?? 0;

        const res = await prisma.recipe.findMany({
            where: {
                OR: [
                    { cookTime: { lte: cookTime } },
                    {
                        category: {
                            in: filterArgs.category as RecipeCategory[],
                        },
                    },
                    { tags: { hasSome: filterArgs.diet } },
                    { region: { in: filterArgs.region as RecipeRegion[] } },
                ],
            },
            select: {
                id: true,
                title: true,
                ingredients: true,
                region: true,
                avatar: true,
                prepTime: true,
                cookTime: true,
                category: true,
                userID: true,
                comments: { select: { rating: true } },
                desc: true,
            },
        });

        return NextResponse.json(
            {
                status: "ok",
                data: { recipes: res },
                message: `${res.length} recipes were found`,
            },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json({
            status: "error",
            data: {},
            message: (err as Error).message,
        });
    }
};

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") as string;

    try {
        const results = await prisma.recipe.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { desc: { contains: query, mode: "insensitive" } },
                    {
                        ingredients: {
                            some: {
                                name: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                avatar: true,
                title: true,
                category: true,
                region: true,
            },
        });
        return NextResponse.json(
            {
                status: "ok",
                data: { recipes: results },
                message: `${results.length} results found`,
            },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json(
            {
                status: "error",
                data: {},
                message: (err as Error).message,
            },
            { status: 500 },
        );
    }
};
