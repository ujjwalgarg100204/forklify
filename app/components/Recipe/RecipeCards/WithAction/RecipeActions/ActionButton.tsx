"use client";

import { green, red } from "@mui/material/colors";

import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import orange from "@mui/material/colors/orange";
import { useEffect } from "react";

type Props = Omit<IconButtonProps, "sx" | "onClick" | "disabled"> & {
    label: string;
    loading: boolean;
    error: string | null;
    onClearError: () => void;
    onClick: () => void;
};

const ActionButton = ({
    label,
    loading,
    onClearError,
    error,
    ...props
}: Props) => {
    useEffect(() => {
        let timerId: string | number | undefined;
        if (error) {
            timerId = window.setTimeout(() => {
                onClearError();
            }, 5000); // error shows for 5 seconds
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [error, onClearError]);

    let toolTipLabel;
    if (loading) toolTipLabel = "Loading...";
    else if (error) toolTipLabel = error;
    else toolTipLabel = label;

    return (
        <Tooltip title={toolTipLabel}>
            <span className="relative">
                <Fab
                    {...props}
                    sx={{
                        backgroundColor: error ? red["600"] : orange["A400"],
                        // p: 1,
                        // aspectRatio: 1,
                        // transition: "all 300ms ease-in-out",

                        width: { xs: 36, md: 48 },
                        height: { xs: 36, md: 48 },

                        "&:hover": {
                            scale: "110%",
                            backgroundColor: error
                                ? red["700"]
                                : orange["A200"],
                        },
                        "&:disabled": {
                            backgroundColor: orange["200"],
                        },
                    }}
                    disabled={loading}
                >
                    {props.children}
                </Fab>
                {loading && (
                    <>
                        <CircularProgress
                            size={44}
                            sx={{
                                display: {
                                    xs: "inline-block",
                                    md: "none",
                                },
                                color: green[500],
                                position: "absolute",
                                top: -4,
                                left: -4,
                                zIndex: 1,
                            }}
                        />
                        <CircularProgress
                            size={60}
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "inline-block",
                                },
                                color: green[500],
                                position: "absolute",
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    </>
                )}
            </span>
        </Tooltip>
    );
};

export default ActionButton;
