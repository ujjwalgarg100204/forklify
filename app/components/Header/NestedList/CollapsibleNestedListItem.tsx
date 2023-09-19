"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import type { ReactNode } from "react";
import { v4 as uuidV4 } from "uuid";

type Props = {
    onListItemExpandToggle: () => void;
    icon: ReactNode;
    text: string;
    expanded: boolean;
    collapsedItems: { href: string; selected: boolean; text: string }[];
};

const CollapsibleNestedListItem = ({
    onListItemExpandToggle,
    icon,
    text,
    expanded,
    collapsedItems,
}: Props) => {
    return (
        <>
            <ListItem component={"li"} disableGutters disablePadding>
                <ListItemButton
                    component={"button"}
                    onClick={onListItemExpandToggle}
                >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                    {expanded ? (
                        <ExpandLessIcon titleAccess="Expand Less" />
                    ) : (
                        <ExpandMoreIcon titleAccess="Expand More" />
                    )}
                </ListItemButton>
            </ListItem>
            <Collapse
                in={expanded}
                timeout={"auto"}
                sx={{
                    borderLeft: 1,
                    borderColor: "green",
                    ml: 4,
                }}
            >
                <List component={"ul"} disablePadding>
                    {collapsedItems.map(item => (
                        <ListItem
                            key={uuidV4()}
                            component={"li"}
                            className="border-l-2 transition duration-300 hover:border-green"
                            disableGutters
                            disablePadding
                        >
                            <ListItemButton
                                href={item.href}
                                LinkComponent={Link}
                                sx={{ pl: 4 }}
                                selected={item.selected}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default CollapsibleNestedListItem;
