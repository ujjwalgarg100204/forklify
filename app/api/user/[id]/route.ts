import { Prisma } from "@prisma/client";
import { prisma } from "@utils/db";
import { NextRequest, NextResponse } from "next/server";

const userSelector = {
    bookmarks: true,
    recipeCollections: true,
    recipes: true,
} satisfies Prisma.UserInclude;

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    const id = params.id;
    const { searchParams } = new URL(req.url);
    const allFilter = searchParams.get("all");

    const user = await prisma.user.findUnique({
        where: { id },
        include: allFilter === "true" ? userSelector : undefined,
    });

    return user
        ? NextResponse.json({ user }, { status: 200 })
        : NextResponse.json({ message: "User not found" }, { status: 404 });
};
