"use client";

import { Button, CircularProgress } from "@mui/material";
import Rating, { RatingProps } from "@mui/material/Rating";
import { Comment, Recipe } from "@prisma/client";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { APIResponse } from "@/app/types/api";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import { API } from "@utils/api";

type Props = {
    recipe: Pick<Recipe, "id">;
};

const CommentForm = ({ recipe }: Props) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, comments, dispatch } = useUserContext();

    // to remove error after a while
    useEffect(() => {
        const timerId = setTimeout(() => {
            setError(null);
        }, 5000);
        return () => clearTimeout(timerId);
    }, [error]);

    const handleCommentChange: ChangeEventHandler<HTMLInputElement> = ev =>
        setComment(ev.target.value);
    const handleRatingChange: RatingProps["onChange"] = (_, val) =>
        setRating(prev => val ?? prev);

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log(comment);
        try {
            setLoading(true);
            const res = await API.post<APIResponse<{ comment: Comment }>>(
                `recipe/comment/${recipe.id}`,
                { comment, rating },
            );
            if (res.data.status === "error") throw new Error(res.data.message);
            dispatch({
                type: "ADD_COMMENT",
                payload: { comment: res.data.data.comment },
            });
            setRating(0);
            setComment(null);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const hasCommented = comments.some(
        comment => comment.recipeID === recipe.id,
    );
    const submitBtnDisabled = hasCommented || !user || loading;

    return (
        <form
            onSubmit={handleSubmit}
            className="relative grid grid-cols-2 items-center gap-y-4 md:self-start md:justify-self-end lg:gap-x-20"
        >
            {hasCommented || !user ? (
                <div className="absolute inset-0 z-10 grid place-content-center rounded-lg backdrop-blur-sm">
                    <p className="font-bold text-green">
                        {hasCommented
                            ? "You have already commented"
                            : "Login to comment"}
                    </p>
                </div>
            ) : null}

            <h1 className="text-2xl font-bold text-gray-800">Tap to Rate</h1>
            <Rating
                name="rating"
                size="large"
                value={rating}
                onChange={handleRatingChange}
            />
            <TextField
                size="medium"
                variant="outlined"
                className="col-span-2"
                value={comment}
                placeholder="Leave a comment..."
                name="comment"
                InputProps={{ sx: { borderRadius: 50 } }}
                onChange={handleCommentChange}
                required
            />
            <div className="relative m-0.5 max-w-fit">
                <Button
                    color={error ? "error" : "secondary"}
                    variant="contained"
                    disabled={submitBtnDisabled}
                    type="submit"
                >
                    {!user ? "Login to comment" : "Comment"}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                        }}
                    />
                )}
            </div>
        </form>
    );
};

export default CommentForm;
