import { Alert, AlertColor, Paper, Portal, Snackbar } from "@mui/material";
import { Recipe, RecipeCollection } from "@prisma/client";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { APIResponse } from "@/app/types/api";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { API } from "@utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CollectionCard from "./CollectionCard";

export interface Props {
    open: boolean;
    recipe: Pick<Recipe, "id">;
    onClose: () => void;
}

const getAlertOptions = (
    loading: boolean,
    error: string | null,
): { msg: string; severity: AlertColor } => {
    if (loading) return { msg: "Loading...", severity: "info" };
    else if (error) return { msg: error, severity: "error" };
    else
        return {
            msg: "Successfully added to collection",
            severity: "success",
        };
};

const CollectionDialog = ({ open, recipe, onClose }: Props) => {
    const { recipesCollections, dispatch } = useUserContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // handle opening and closing of snackbar
    const handleCloseSnackbar = (_?: any, reason?: string) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
        setError(null);
    };

    const handleNewCollectionClick = () => {
        router.push("/collection/new");
    };

    const handleCollectionCardClick = (id: string): (() => void) => {
        const recipeCollection = recipesCollections.find(c => c.id === id)!;
        const isPartOfCollection = recipeCollection.recipeIDs.includes(
            recipe.id,
        );

        if (isPartOfCollection) {
            // remove recipe from collection
            return async () => {
                try {
                    setLoading(true);
                    onClose();
                    setOpenSnackbar(true);
                    const res = (
                        await API.delete<
                            APIResponse<{
                                collection: RecipeCollection;
                            }>
                        >(`recipe/addToCollection/${recipe.id}/${id}`)
                    ).data;
                    if (res.status === "error") throw new Error(res.message);
                    dispatch({
                        type: "DELETE_RECIPE_FROM_COLLECTION",
                        payload: {
                            collectionId: id,
                            recipeId: recipe.id,
                        },
                    });
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            };
        }
        return async () => {
            try {
                setLoading(true);
                onClose();
                setOpenSnackbar(true);
                const res = (
                    await API.put<
                        APIResponse<{
                            collection: RecipeCollection;
                        }>
                    >(`recipe/addToCollection/${recipe.id}/${id}`)
                ).data;
                if (res.status === "error") throw new Error(res.message);
                dispatch({
                    type: "ADD_RECIPE_TO_COLLECTION",
                    payload: {
                        recipeId: recipe.id,
                        collectionId: id,
                    },
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
    };

    const alertOptions = getAlertOptions(loading, error);
    return (
        <>
            <Portal>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={alertOptions.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertOptions.msg}
                    </Alert>
                </Snackbar>
            </Portal>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>Add to Following Collection</DialogTitle>
                <Paper sx={{ width: 420, maxWidth: "100%" }}>
                    <MenuList>
                        {recipesCollections.map(collection => (
                            <CollectionCard
                                key={collection.id}
                                collection={collection}
                                icon={
                                    collection.recipeIDs.includes(recipe.id) ? (
                                        <PlaylistRemoveIcon fontSize="medium" />
                                    ) : (
                                        <PlaylistAddIcon fontSize="medium" />
                                    )
                                }
                                onClick={handleCollectionCardClick(
                                    collection.id,
                                )}
                            />
                        ))}
                        <Divider />
                        <MenuItem
                            onClick={handleNewCollectionClick}
                            sx={{ gap: 2 }}
                        >
                            <ListItemIcon>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText>Create new Collection</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Dialog>
        </>
    );
};

export default CollectionDialog;
