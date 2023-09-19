"use client";

import { Either } from "@/app/types";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import CollapsibleNestedListItem from "./CollapsibleNestedListItem";
import NestedListItem from "./NestedListItem";

export type TListItem = {
    icon: ReactNode;
    text: string;
} & Either<{ href: string }, { subItems: TNestedListItem[] }>;

export type TNestedListItem = Required<Omit<TListItem, "subItems" | "icon">>;

type Props = {
    list: TListItem[];
};

const NestedList = ({ list }: Props) => {
    const [listItemExpand, setListItemExpand] = useState<number | null>(null);
    const listItemExpandToggleHandler = (index: number) => () =>
        setListItemExpand(prev => (prev === index ? null : index));
    const currUrl = usePathname();
    return (
        <List
            component="ul"
            subheader={
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    className="text-center"
                >
                    Enjoy the cooking!!!
                </ListSubheader>
            }
        >
            {list.map((item, i) =>
                item.subItems ? (
                    <CollapsibleNestedListItem
                        key={uuidV4()}
                        collapsedItems={item.subItems.map(subItem => ({
                            ...subItem,
                            selected: currUrl === subItem.href,
                        }))}
                        expanded={listItemExpand === i}
                        icon={item.icon}
                        onListItemExpandToggle={listItemExpandToggleHandler(i)}
                        text={item.text}
                    />
                ) : (
                    <NestedListItem
                        key={uuidV4()}
                        {...item}
                        selected={currUrl === item.href}
                    />
                ),
            )}
        </List>
    );
};

export default NestedList;
