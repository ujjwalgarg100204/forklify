"use client";

import { NAV_ITEMS } from "@/app/data";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileMenu from "./ProfileMenu";
import SignInButton from "./SignInButton";

type Props = {
    onDrawerToggle: () => void;
};

const Navbar = ({ onDrawerToggle }: Props) => {
    const currUrl = usePathname();
    const { status } = useSession();
    const isHomePage = currUrl == "/";

    return (
        <AppBar
            component="nav"
            position="static"
            className="shadow-none"
            sx={{
                background: isHomePage ? "transparent" : "#283618",
                boxShadow: isHomePage ? "none" : "auto",
            }}
        >
            <Toolbar className="flex gap-4 p-4 md:gap-12">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    size="medium"
                >
                    <RestaurantMenuIcon
                        sx={{
                            fontSize: {
                                md: 40,
                                xs: 32,
                            },
                        }}
                    />
                </IconButton>
                <Link href="/">
                    <Image
                        src={"/images/logo/logo.svg"}
                        alt={"go to home"}
                        className={
                            "h-16 w-16 object-cover md:h-20 md:w-20 lg:h-24 lg:w-24"
                        }
                        height={200}
                        width={200}
                    />
                </Link>
                <div className="flex-1 md:block">
                    <List
                        component={"ul"}
                        className="items-center justify-end"
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                        }}
                    >
                        {NAV_ITEMS.map(item => (
                            <ListItem key={item.href} className="max-w-fit">
                                <ListItemButton
                                    href={item.href}
                                    LinkComponent={Link}
                                    selected={currUrl === item.href}
                                >
                                    {item.title}
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem className="max-w-fit">
                            {status === "authenticated" ? (
                                <div>
                                    <ProfileMenu />
                                </div>
                            ) : (
                                <SignInButton />
                            )}
                        </ListItem>
                    </List>
                    {status === "authenticated" ? (
                        <div className="flex justify-end md:hidden">
                            <ProfileMenu />
                        </div>
                    ) : (
                        <div className="flex justify-end md:hidden">
                            <SignInButton />
                        </div>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
