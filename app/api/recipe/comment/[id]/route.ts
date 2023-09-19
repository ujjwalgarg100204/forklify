import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@utils/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    const { id } = params;
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
        const body = await req.json();
        console.log(body);
        if (!(body.rating && body.comment)) throw new Error("Missing body");
        console.log(body);

        const newComment = await prisma.comment.create({
            data: { recipeID: id, userID: session.user.id, ...body },
        });
        const path = req.nextUrl.searchParams.get("path");

        if (path) revalidatePath(path);
        return NextResponse.json(
            {
                status: "ok",
                data: {
                    comment: newComment,
                    message: "Comment was successfully created",
                },
            },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json(
            { status: "error", data: {}, message: (err as Error).message },
            { status: 404 },
        );
    }
};
