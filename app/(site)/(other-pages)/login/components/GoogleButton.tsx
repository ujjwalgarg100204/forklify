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

const GoogleButton = ({ onClick }: Props) => {
    return (
        <ListItem>
            <ListItemButton
                component={"button"}
                onClick={onClick}
                sx={{
                    border: "2px solid black",
                    borderRadius: 50,
                    "& .MuiTypography-root": {
                        fontSize: {
                            xs: 12,
                            sm: 16,
                        },
                    },
                }}
            >
                <ListItemIcon>
                    <Image
                        src={"/images/socials/google.png"}
                        alt={"google sign-in"}
                        className={"h-6 w-6"}
                        height={50}
                        width={50}
                    />
                </ListItemIcon>
                <ListItemText primary="Continue with Google" />
            </ListItemButton>
        </ListItem>
    );
};

export default GoogleButton;
