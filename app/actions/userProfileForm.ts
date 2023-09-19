"use server";

import { User } from "@prisma/client";
import { prisma } from "@utils/db";
import { z } from "zod";
import { APIResponse } from "../types/api";

const UserProfileSchema = z.object({
    bio: z.string().max(255, "Bio should not exceed 255 characters").optional(),
    location: z
        .string()
        .max(255, "Location should not exceed 255 characters")
        .optional(),
    image: z.string().url("Only an URL can be provided here").optional(),
});

type UserFormSchema = z.infer<typeof UserProfileSchema>;

const userProfileForm = async (
    user: UserFormSchema,
    id: string,
): Promise<APIResponse<{ user: User }>> => {
    const safeUser = UserProfileSchema.safeParse(user);
    if (!safeUser.success)
        return {
            status: "error",
            data: {},
            message: safeUser.error.message,
        };
    const { data } = safeUser;

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { ...data },
        });
        return {
            status: "ok",
            data: { user: updatedUser },
            message: "User profile updated successfully",
        };
    } catch (err) {
        return { status: "error", data: {}, message: (err as Error).message };
    }
};

export default userProfileForm;
