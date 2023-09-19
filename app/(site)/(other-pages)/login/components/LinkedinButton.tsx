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

const LinkedinButton = ({ onClick }: Props) => {
    return (
        <ListItem>
            <ListItemButton
                component="button"
                onClick={onClick}
                sx={{
                    border: "2px solid #0077B5",
                    borderRadius: 50,
                    backgroundColor: "#0077B5",
                    color: "white",
                    "& .MuiTypography-root": {
                        fontSize: {
                            xs: 12,
                            sm: 16,
                        },
                    },
                    "&:hover": {
                        backgroundColor: "rgba(0, 119, 181, 0.8)",
                    },
                }}
            >
                <ListItemIcon>
                    <Image
                        src={"/images/socials/linkedin.png"}
                        alt={"linkedin sign-in"}
                        className={"h-6 w-6"}
                        height={50}
                        width={50}
                    />
                </ListItemIcon>
                <ListItemText primary="Continue with LinkedIn" />
            </ListItemButton>
        </ListItem>
    );
};

export default LinkedinButton;
