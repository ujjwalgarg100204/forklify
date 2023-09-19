"use client";

import { MouseEventHandler, useState } from "react";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import { PROFILE_MENU_ITEMS } from "@/app/data";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick: MouseEventHandler<HTMLElement> = ev =>
        setAnchorEl(ev.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const { user } = useUserContext();
    if (!user) return <LoadingSpinner />;

    return (
        <>
            <Tooltip title="Your profile">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar
                        alt={user.name ?? "anonymous"}
                        src={user.image ?? undefined}
                        sx={{ width: 56, height: 56 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.56))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 56,
                            height: 56,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    href="/user/profile"
                    LinkComponent={Link}
                    component={Link}
                >
                    <Avatar
                        alt={user.name ?? undefined}
                        src={user.image ?? undefined}
                    />{" "}
                    My account
                </MenuItem>
                <Divider />
                {PROFILE_MENU_ITEMS.map(option =>
                    option.onClick ? (
                        <MenuItem key={uuidV4()} onClick={option.onClick}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            {option.title}
                        </MenuItem>
                    ) : (
                        <MenuItem
                            key={option.title}
                            href={option.href!}
                            LinkComponent={Link}
                            component={Link}
                            onClick={handleClose}
                        >
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            {option.title}
                        </MenuItem>
                    ),
                )}
            </Menu>
        </>
    );
};

export default ProfileMenu;
