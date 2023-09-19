"use client";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { User } from "@prisma/client";
import { swap } from "@utils/array";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

type Props = {
    comments: {
        rating: number;
        comment: string;
        user: Pick<User, "name" | "image">;
    }[];
};

const MINIMUM_COMMENTS_TO_SHOW = 3;

const CommentSection = ({ comments }: Props) => {
    const { user } = useUserContext();
    const [showAllComments, setShowAllComments] = useState(false);
    const handleClick = () => setShowAllComments(prev => !prev);
    const commentsToShow = comments.slice(
        0,
        showAllComments ? undefined : MINIMUM_COMMENTS_TO_SHOW,
    );

    // render current user's comment first
    if (user) {
        const currentUserCommentIndex = comments.findIndex(
            comment => comment.user.name === user.name,
        );
        if (currentUserCommentIndex !== -1)
            swap(comments, 0, currentUserCommentIndex);
    }

    return (
        <section className="space-y-6 md:justify-self-start">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Rating and Comments
            </h1>

            <ul className="space-y-6 divide-red-200">
                {commentsToShow.map(comment => (
                    <li key={uuidV4()} className="flex items-center gap-6">
                        <Avatar
                            alt={comment.user.name ?? "Anonymous"}
                            src={comment.user.image ?? undefined}
                            sx={{ width: 60, height: 60 }}
                            className="row-span-2 w-20 justify-self-stretch"
                        />
                        <div className="grid flex-1 grid-cols-2">
                            <h3 className="w-fit text-lg font-[500] text-black md:text-xl">
                                {comment.user.name ?? "Anonymous"}
                            </h3>
                            <Rating
                                className="justify-self-end md:justify-self-start"
                                value={comment.rating}
                                sx={{ fontSize: { md: 24 } }}
                                size="small"
                                readOnly
                            />
                            <p className="col-span-2 text-sm md:text-base">
                                {comment.comment}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <Button
                variant="text"
                onClick={handleClick}
                disabled={comments.length <= MINIMUM_COMMENTS_TO_SHOW}
            >
                {showAllComments ? "Show Less" : "Show More"}
            </Button>
        </section>
    );
};

export default CommentSection;
