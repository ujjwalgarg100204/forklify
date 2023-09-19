import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import Link from "next/link";
import type { ReactNode } from "react";

type NestedListItemProps = {
    href: string;
    selected: boolean;
    icon: ReactNode;
    text: string;
};

const NestedListItem = ({
    href,
    selected,
    icon,
    text,
}: NestedListItemProps) => {
    return (
        <ListItem disableGutters disablePadding>
            <ListItemButton
                href={href}
                LinkComponent={Link}
                selected={selected}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

export default NestedListItem;
