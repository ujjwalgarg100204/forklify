"use client";

import { useUserContext } from "@/app/contexts/UserProvider/UserProvider";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import { useState } from "react";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";

const UserDashboardPage = () => {
    const { user } = useUserContext();
    const [profileEdit, setProfileEdit] = useState(false);
    if (user === null) return <LoadingSpinner />;

    const handleProfileEdit = () => setProfileEdit(prev => !prev);

    return (
        <>
            {profileEdit ? (
                <UserForm
                    user={user}
                    onGoBack={handleProfileEdit}
                    onSubmit={handleProfileEdit}
                />
            ) : (
                <UserDetails user={user} onViewChange={handleProfileEdit} />
            )}
        </>
    );
};

export default UserDashboardPage;
