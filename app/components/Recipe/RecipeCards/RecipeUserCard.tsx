"use client";

import { useEffect, useState } from "react";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { APIResponse } from "@/app/types/api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlineIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import green from "@mui/material/colors/green";
import { Recipe } from "@prisma/client";
import { API } from "@utils/api";
import Link from "next/link";
import Card from "./WithAction/Card";

type Props = {
    recipe: Pick<
        Recipe,
        | "id"
        | "avatar"
        | "title"
        | "prepTime"
        | "cookTime"
        | "ingredients"
        | "userID"
        | "region"
    > & { rating: number };
};

const RecipeUserCard = ({ recipe }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { dispatch, recipes } = useUserContext();
    const deleted = !recipes.find(r => r.id === recipe.id);

    const handleDeleteClick = async () => {
        try {
            setLoading(true);
            const res = await API.delete<APIResponse<{ recipe: Recipe }>>(
                `recipe/${recipe.id}/`,
            );
            if (res.data.status === "error") throw new Error(res.data.message);
            dispatch({ type: "DELETE_RECIPE", payload: { id: recipe.id } });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error === null) return;
        const timerId = setTimeout(() => setError(null), 3_000);
        return () => clearTimeout(timerId);
    }, [error]);

    return (
        <div
            key={recipe.id}
            className="relative mx-auto min-w-[14rem] max-w-[18rem] space-y-2"
        >
            {deleted ? (
                <div className="absolute inset-0 z-50 grid h-full w-full place-content-center backdrop-blur-sm">
                    <p className="rounded-full bg-red-100 p-2 px-4 font-semibold text-red-600">
                        Recipe Deleted
                    </p>
                </div>
            ) : null}
            <Card recipe={recipe} />
            <div className="flex justify-between">
                <Button
                    variant="contained"
                    startIcon={<EditOutlineIcon className="text-white" />}
                    size="small"
                    href={`/user/recipe/${recipe.id}/edit`}
                    LinkComponent={Link}
                >
                    Edit
                </Button>

                <div className="relative">
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteOutlineIcon className="text-white" />}
                        size="small"
                        onClick={handleDeleteClick}
                        disabled={loading}
                    >
                        {error ? "Try again" : "Delete"}
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: "absolute",
                                top: "30%",
                                left: "50%",
                                zIndex: 1,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeUserCard;
