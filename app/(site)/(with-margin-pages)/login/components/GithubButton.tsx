import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import Image from "next/image";

type Props = {
    onClick: () => void;
};

const GithubButton = ({ onClick }: Props) => {
    return (
        <ListItem>
            <ListItemButton
                component="button"
                onClick={onClick}
                sx={{
                    border: "2px solid black",
                    borderRadius: 50,
                    backgroundColor: "black",
                    color: "white",
                    "& .MuiTypography-root": {
                        fontSize: {
                            xs: 12,
                            sm: 16,
                        },
                    },
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                    },
                }}
            >
                <ListItemIcon>
                    <Image
                        src={"/images/socials/github.png"}
                        alt={"github sign-in"}
                        className={"h-6 w-6 rounded-full bg-white"}
                        height={50}
                        width={50}
                    />
                </ListItemIcon>
                <ListItemText primary="Continue with GitHub" />
            </ListItemButton>
        </ListItem>
    );
};

export default GithubButton;
