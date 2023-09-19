import { Bookmark, Recipe } from "@prisma/client";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { APIResponse } from "@/app/types/api";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { API } from "@utils/api";
import { useState } from "react";
import ActionButton from "./ActionButton";

type Props = {
    recipe: Pick<Recipe, "id">;
};

const BookmarkAction = ({ recipe }: Props) => {
    const { bookmarks, dispatch } = useUserContext();
    const isBookmarked = bookmarks.some(b => b.recipeID === recipe.id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBookmarkClick = async () => {
        if (isBookmarked) {
            try {
                setLoading(true);
                const bookmarkId = bookmarks.find(
                    b => b.recipeID === recipe.id,
                )!.id;
                const res = (
                    await API.delete<
                        APIResponse<{
                            bookmark: Bookmark;
                        }>
                    >(`recipe/bookmark/${bookmarkId}`)
                ).data;
                if (res.status === "error") throw new Error(res.message);
                dispatch({
                    type: "DELETE_BOOKMARK",
                    payload: { id: bookmarkId },
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
                return;
            }
        }

        // bookmark recipe
        try {
            setLoading(true);
            const res = (
                await API.put<APIResponse<{ bookmark: Bookmark }>>(
                    `recipe/bookmark/${recipe.id}`,
                )
            ).data;
            if (res.status === "error") throw new Error(res.message);
            dispatch({
                type: "ADD_BOOKMARK",
                payload: { bookmark: res.data.bookmark },
            });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleErrorClear = () => setError(null);

    return (
        <ActionButton
            label={isBookmarked ? "Un-bookmark recipe" : "Bookmark recipe"}
            onClick={handleBookmarkClick}
            loading={loading}
            error={error}
            onClearError={handleErrorClear}
        >
            {isBookmarked ? (
                <BookmarkRemoveOutlinedIcon
                    className="text-white"
                    sx={{ fontSize: { xs: 20, sx: 24 } }}
                />
            ) : (
                <BookmarkAddOutlinedIcon
                    className="text-white"
                    sx={{ fontSize: { xs: 20, sx: 24 } }}
                />
            )}
        </ActionButton>
    );
};

export default BookmarkAction;
