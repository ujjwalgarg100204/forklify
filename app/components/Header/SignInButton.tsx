"use client";

import LoadingSpinner from "@components/UI/LoadingSpinner";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SignInButton = () => {
    const { status } = useSession();
    const currUrl = usePathname();

    return status === "loading" ? (
        <LoadingSpinner />
    ) : (
        <Button
            className="max-w-fit"
            href="/login"
            LinkComponent={Link}
            disabled={currUrl === "/login"}
            sx={{
                ml: "auto",
                color: "white",
                background: "#606C38",
                borderRadius: 100,
                px: 2,
                py: 1.5,
            }}
        >
            Sign In/Up
        </Button>
    );
};

export default SignInButton;
