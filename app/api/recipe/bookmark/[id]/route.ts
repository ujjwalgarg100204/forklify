import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    const { id: recipeId } = params;
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(
            {
                status: "error",
                data: {},
                message: "User needs to be logged in to bookmark a recipe",
            },
            { status: 401 },
        );

    try {
        const newBookmark = await prisma.bookmark.create({
            data: {
                recipeID: recipeId,
                userID: session.user.id,
            },
        });
        return NextResponse.json(
            {
                status: "ok",
                data: { bookmark: newBookmark },
                message: "Bookmark was successfully created",
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

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    const { id: bookmarkId } = params;
    const session = await getServerSession();

    if (!session)
        return NextResponse.json(
            {
                status: "error",
                data: {},
                message: "User needs to be logged in to bookmark a recipe",
            },
            { status: 401 },
        );

    try {
        const deletedBookmark = await prisma.bookmark.delete({
            where: { id: bookmarkId, userID: session.user.id },
        });

        return NextResponse.json(
            {
                status: "ok",
                data: { bookmark: deletedBookmark },
                message: "Bookmark was successfully deleted",
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
