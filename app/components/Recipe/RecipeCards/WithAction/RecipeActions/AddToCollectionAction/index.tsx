"use client";

import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import { Recipe } from "@prisma/client";
import { useState } from "react";
import ActionButton from "../ActionButton";
import CollectionDialog from "./CollectionDialog";

type Props = {
    recipe: Pick<Recipe, "id">;
};

const AddToCollection = ({ recipe }: Props) => {
    const [openCollectionDialog, setOpenCollectionDialog] = useState(false);

    // handle opening and closing of dialog
    const handleAddToCollectionClick = () => {
        setOpenCollectionDialog(true);
    };
    const handleDialogClose = () => {
        setOpenCollectionDialog(false);
    };

    return (
        <>
            <ActionButton
                error={null}
                label="Add to Collection"
                loading={false}
                onClearError={() => {}}
                onClick={handleAddToCollectionClick}
            >
                <CreateNewFolderOutlinedIcon
                    className="text-white"
                    sx={{ fontSize: { xs: 20, sm: 24 } }}
                />
            </ActionButton>

            <CollectionDialog
                onClose={handleDialogClose}
                open={openCollectionDialog}
                recipe={recipe}
            />
        </>
    );
};

export default AddToCollection;
