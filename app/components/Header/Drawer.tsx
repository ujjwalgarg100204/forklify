"use client";

import MuiDrawer, { type DrawerProps } from "@mui/material/Drawer";

import Divider from "@mui/material/Divider";
import Image from "next/image";
import Link from "next/link";

type Props = Omit<DrawerProps, "sx" | "anchor" | "variant" | "ModalProps">;

const drawerWidth = 240;
const Drawer = ({ children, ...drawerProps }: Props) => {
    return (
        <MuiDrawer
            role="navigation"
            variant="temporary"
            anchor="left"
            ModalProps={{ keepMounted: true }}
            sx={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                },
            }}
            {...drawerProps}
        >
            <div className="space-y-4 text-center">
                <Link href="/">
                    <Image
                        src="/images/logo/logo-black.svg"
                        alt="logo"
                        className="mx-auto h-44 w-44 object-cover"
                        height={100}
                        width={100}
                    />
                </Link>
            </div>
            <Divider className="mb-2" />
            {children}
        </MuiDrawer>
    );
};

export default Drawer;
