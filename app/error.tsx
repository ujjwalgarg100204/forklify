"use client";

import Lottie from "@components/UI/Lottie";
import { Button } from "@mui/material";
import { useEffect } from "react";

type Props = {
    error: Error;
    reset: () => void;
};
const ErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    const handleReset = () => reset();
    return (
        <main className="flex flex-col items-center justify-center gap-8 px-4 py-16 text-center md:px-8">
            <h2 className="text-2xl font-bold text-orange md:text-3xl lg:text-4xl">
                Well, Something went wrong!
            </h2>
            <Lottie
                src="/lottie/lady-thinking.json"
                className="h-64 w-64 md:h-72 md:w-72 lg:h-96 lg:w-96"
            />
            <div className="flex items-center justify-center gap-4">
                <span>Want to </span>
                <Button
                    onClick={handleReset}
                    color="secondary"
                    variant="contained"
                >
                    Try again
                </Button>
                <span>?</span>
            </div>
        </main>
    );
};

export default ErrorPage;
