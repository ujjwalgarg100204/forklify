"use client";

import { ListItemIcon, MenuItem, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { RecipeCollection } from "@prisma/client";
import { ReactNode } from "react";

type Props = {
    collection: Pick<RecipeCollection, "id" | "title" | "avatar">;
    icon: ReactNode;
    onClick: () => void;
};

const CollectionCard = ({ collection, onClick, icon }: Props) => {
    return (
        <MenuItem onClick={onClick} sx={{ gap: 2 }}>
            <ListItemIcon>
                <Avatar
                    alt={collection.title}
                    src={collection.avatar ?? undefined}
                />
            </ListItemIcon>
            <ListItemText className="capitalize">
                <Typography variant="inherit" noWrap>
                    {collection.title}
                </Typography>
            </ListItemText>
            {icon}
        </MenuItem>
    );
};

export default CollectionCard;
