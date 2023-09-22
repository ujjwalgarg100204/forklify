"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import collectionUpdateForm from "@/app/actions/collectionUpdateForm";
import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import { RecipeCollection } from "@prisma/client";
import { z } from "zod";

type Props = {
    collection: Pick<RecipeCollection, "id" | "title" | "desc" | "avatar">;
};

const CollectionUpdateFormSchema = z.object({
    title: z.string().min(3).max(50),
    desc: z.string().min(3).max(500),
    avatar: z.string().url().optional(),
});

type CollectionUpdateFormSchema = z.infer<typeof CollectionUpdateFormSchema>;

const CollectionUpdateForm = ({ collection }: Props) => {
    const { dispatch } = useUserContext();
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

    const onSubmit: SubmitHandler<CollectionUpdateFormSchema> = async data => {
        try {
            const res = await collectionUpdateForm(collection.id, data);
            if (res.status === "error") throw new Error(res.message);
            dispatch({
                type: "UPDATE_RECIPE_COLLECTION",
                payload: {
                    recipeCollectionId: collection.id,
                    recipeCollection: data,
                },
            });
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
                defaultValue={collection.title}
                helperText={errors.title?.message}
                placeholder="Title"
                fullWidth
            />
            <TextField
                {...register("desc")}
                label="Description"
                variant="standard"
                error={!!errors.desc}
                defaultValue={collection.desc}
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
                    defaultValue={collection.avatar}
                    helperText={errors.avatar?.message}
                    placeholder="https://example.com/image.png"
                    fullWidth
                />
                <Avatar src={watch("avatar")} alt={collection.title} />
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

export default CollectionUpdateForm;
