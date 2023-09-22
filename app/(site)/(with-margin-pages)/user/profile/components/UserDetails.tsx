"use client";

import useWindowSize from "@hooks/useWindowSize";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { User } from "@prisma/client";
import Link from "next/link";

type Props = {
    user: User;
    onViewChange: () => void;
};

const UserDetails = ({ user, onViewChange }: Props) => {
    const { width } = useWindowSize();
    const createdAtDate = new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
    const handleViewChange = () => onViewChange();
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-2 md:gap-4">
                <Avatar
                    alt={user.name ?? "Anonymous"}
                    src={user.image ?? undefined}
                    sx={{
                        width: { xs: 96, lg: 128 },
                        height: { xs: 96, lg: 128 },
                    }}
                />
                <p className="text-2xl font-semibold text-orange md:text-3xl">
                    {user.name}
                </p>
                <div className="space-y-1 text-sm md:space-y-2 md:text-base">
                    {user.location ? (
                        <p className="flex items-center justify-center gap-2">
                            <LocationOnIcon className="text-4xl text-light-green" />
                            {user.location}
                        </p>
                    ) : null}
                    <p className="flex items-center justify-center gap-2">
                        <EmailIcon className="text-4xl text-light-green" />{" "}
                        {user.email}
                    </p>
                    <p className="flex items-center justify-center gap-2">
                        <CalendarMonthIcon className="text-4xl text-light-green" />{" "}
                        Joined on: {createdAtDate}
                    </p>
                </div>
                <p className="text-base md:text-lg">
                    {user.bio ?? "Your bio appears here!"}
                </p>
            </section>
            <section className="grid place-content-center">
                <ButtonGroup
                    variant="contained"
                    color="secondary"
                    size={width && width > 768 ? "medium" : "small"}
                >
                    <Button onClick={handleViewChange}>Edit Profile</Button>
                    <Button href="/user/recipe" LinkComponent={Link}>
                        Your Recipes
                    </Button>
                    <Button href="/user/collection" LinkComponent={Link}>
                        Your Collections
                    </Button>
                    <Button href="/user/recipe/bookmark" LinkComponent={Link}>
                        Your Bookmarks
                    </Button>
                </ButtonGroup>
            </section>
        </>
    );
};

export default UserDetails;
