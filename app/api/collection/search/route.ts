import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@utils/db";

export const GET = async (req: NextRequest) => {
    const query = new URL(req.nextUrl).searchParams.get("q") as string;
    if (!query)
        return NextResponse.json(
            { status: "error", data: {}, message: "No query provided" },
            { status: 400 },
        );

    try {
        const res = await prisma.recipeCollection.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { desc: { contains: query, mode: "insensitive" } },
                    {
                        recipes: {
                            some: {
                                title: { contains: query, mode: "insensitive" },
                            },
                        },
                    },
                    {
                        user: {
                            name: { contains: query, mode: "insensitive" },
                        },
                    },
                ],
            },
            select: {
                id: true,
                avatar: true,
                title: true,
                recipeIDs: true,
            },
        });
        return NextResponse.json({
            status: "ok",
            data: { collections: res },
            message: `${res.length} collections were found`,
        });
    } catch (err) {
        return NextResponse.json({
            status: "error",
            data: {},
            message: (err as Error).message,
        });
    }
};
