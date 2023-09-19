import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
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
        const deleted = await prisma.recipe.delete({
            where: { id: params.id, userID: session.user.id },
        });
        return NextResponse.json({
            status: "success",
            data: { recipe: deleted },
            message: "Recipe deleted successfully",
        });
    } catch (err) {
        return NextResponse.json(
            { status: "error", data: {}, message: (err as Error).message },
            { status: 500 },
        );
    }
};
