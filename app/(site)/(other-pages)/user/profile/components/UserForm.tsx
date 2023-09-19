"use client";

import { Avatar, Button, CircularProgress, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import userProfileForm from "@/app/actions/userProfileForm";
import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { green } from "@mui/material/colors";
import { User } from "@prisma/client";
import { z } from "zod";

type Props = {
    user: User;
    onGoBack: () => void;
    onSubmit: () => void;
};

export const UserProfileSchema = z.object({
    bio: z.string().max(255, "Bio should not exceed 255 characters").optional(),
    location: z
        .string()
        .max(255, "Location should not exceed 255 characters")
        .refine(value => !/\d/.test(value))
        .optional(),
    image: z.string().url("Only an URL can be provided here").optional(),
});

export type UserFormSchema = z.infer<typeof UserProfileSchema>;

const UserForm = ({ user, onGoBack, onSubmit: onFormSubmit }: Props) => {
    const { dispatch } = useUserContext();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UserFormSchema>({
        resolver: zodResolver(UserProfileSchema),
        criteriaMode: "all",
    });

    const onSubmit: SubmitHandler<UserFormSchema> = async data => {
        try {
            const res = await userProfileForm(data, user.id);
            if (res.status === "error") throw new Error(res.message);
            dispatch({
                type: "UPDATE_USER",
                payload: { user: res.data.user },
            });
            onFormSubmit();
        } catch (err) {
            setError("root.serverError", {
                type: "500",
                message: (err as Error).message,
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-6 px-6 sm:px-12 md:gap-8 md:px-16 lg:px-24"
        >
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Edit your Profile
            </h1>
            <div className="flex justify-between gap-2">
                <TextField
                    label="Image URL"
                    variant="standard"
                    error={!!errors.image}
                    defaultValue={user.image}
                    helperText={errors.image?.message}
                    placeholder="https://example.com/image.png"
                    className="flex-1"
                    {...register("image")}
                />
                <Avatar src={watch("image")} alt={user.name ?? "Anonymous"} />
            </div>
            <TextField
                label="Bio"
                variant="standard"
                placeholder="My bio"
                error={!!errors.bio}
                defaultValue={user.bio}
                helperText={errors.bio?.message}
                {...register("bio")}
            />
            <TextField
                label="Location"
                variant="standard"
                error={!!errors.location}
                placeholder="My location"
                defaultValue={user.location}
                helperText={errors.location?.message}
                {...register("location")}
            />
            <div className="mx-auto mt-6 flex justify-between gap-12 md:gap-24">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onGoBack}
                >
                    Go Back
                </Button>
                <div className="relative">
                    <Button
                        variant="contained"
                        color={
                            errors.root?.serverError.type === "500"
                                ? "error"
                                : "secondary"
                        }
                        type="submit"
                    >
                        {errors.root?.serverError ? "Try Again" : "Submit"}
                    </Button>
                    {isSubmitting && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                zIndex: 1,
                            }}
                        />
                    )}
                </div>
            </div>
        </form>
    );
};

export default UserForm;
