"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import { newCollection } from "@/app/actions/collectionUpdateForm";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CollectionUpdateFormSchema = z.object({
    title: z.string().min(3).max(50),
    desc: z.string().min(3).max(500),
    avatar: z.string().url().optional(),
});

type CollectionUpdateFormSchema = z.infer<typeof CollectionUpdateFormSchema>;

const NewCollectionForm = () => {
    const router = useRouter();
    const { dispatch, user } = useUserContext();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<CollectionUpdateFormSchema>({
        resolver: zodResolver(CollectionUpdateFormSchema),
        criteriaMode: "all",
    });

    if (!user) return <LoadingSpinner />;

    const onSubmit: SubmitHandler<CollectionUpdateFormSchema> = async data => {
        try {
            const newCollectionObj = {
                ...data,
                userID: user.id,
                avatar: data.avatar ?? null,
            };
            const res = await newCollection(newCollectionObj);
            if (res.status === "error") throw new Error(res.message);
            dispatch({
                type: "ADD_RECIPE_COLLECTION",
                payload: {
                    recipeCollection: res.data.collection,
                },
            });
            router.push(`/collection/${res.data.collection.id}`);
        } catch (err) {
            setError("root.serverError", {
                type: "500",
                message: (err as Error).message,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root?.serverError && (
                <p className="text-rose-600">
                    {errors.root.serverError.message}, Please Try again
                </p>
            )}
            <TextField
                {...register("title")}
                label="Title"
                variant="standard"
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Title"
                fullWidth
            />
            <TextField
                {...register("desc")}
                label="Description"
                variant="standard"
                error={!!errors.desc}
                helperText={errors.desc?.message}
                placeholder="My awesome collection"
                fullWidth
            />
            <div className="flex items-center gap-2">
                <TextField
                    {...register("avatar")}
                    label="Avatar of Collection"
                    variant="standard"
                    error={!!errors.avatar}
                    helperText={errors.avatar?.message}
                    placeholder="https://example.com/image.png"
                    fullWidth
                />
                <Avatar src={watch("avatar")} />
            </div>

            <div className="relative w-fit">
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                        ...(isSubmitSuccessful && {
                            bgcolor: green[500],
                            "&:hover": {
                                bgcolor: green[700],
                            },
                        }),
                    }}
                >
                    Submit
                </Button>
                {isSubmitting ? (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: "absolute",
                            top: "20%",
                            left: "30%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1,
                        }}
                    />
                ) : null}
            </div>
        </form>
    );
};

export default NewCollectionForm;
