"use client";

import { signIn, useSession } from "next-auth/react";

import { List } from "@mui/material";
import { useRouter } from "next/navigation";
import GithubButton from "./components/GithubButton";
import GoogleButton from "./components/GoogleButton";
import LinkedinButton from "./components/LinkedinButton";

const LoginPage = () => {
    const router = useRouter();
    const { status } = useSession();
    if (status === "authenticated") {
        router.push("/");
        return;
    }

    const handleClick = (provider: "google" | "github" | "linkedin") => () =>
        signIn(provider);

    return (
        <section className="h-full w-full px-0 py-0 sm:px-16 sm:py-16 md:px-32 lg:px-52 xl:px-64">
            <div className="mx-auto max-w-fit bg-white px-12 py-12 text-sm transition sm:rounded-2xl sm:shadow-lg sm:hover:shadow-xl md:px-20 lg:px-40 lg:text-base">
                <h1 className="mb-12 text-center text-3xl font-bold text-black lg:text-4xl">
                    Sign In/Up
                </h1>
                <List>
                    <GoogleButton onClick={handleClick("google")} />
                    <GithubButton onClick={handleClick("github")} />
                    <LinkedinButton onClick={handleClick("linkedin")} />
                </List>
            </div>
        </section>
    );
};
export default LoginPage;
