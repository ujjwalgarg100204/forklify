"use client";

import { Prisma } from "@prisma/client";
import { API } from "@utils/api";
import { useSession } from "next-auth/react";
import {
    Dispatch,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import userReducer, { Action, UserState, initialState } from "./UserReducer";

const userSelector = {
    bookmarks: true,
    recipeCollections: true,
    recipes: true,
} satisfies Prisma.UserInclude;

type User = Prisma.UserGetPayload<{ include: typeof userSelector }>;

const UserContext = createContext<
    (UserState & { dispatch: Dispatch<Action> }) | null
>(null);

const getUserData = async (userId: string) => {
    const user = (await API.get<{ user: User }>(`user/${userId}?all=true`))
        .data;
    return {
        user: user.user,
        bookmarks: user.user.bookmarks ?? [],
        recipes: user.user.recipes ?? [],
        recipesCollections: user.user.recipeCollections ?? [],
    };
};

const UserProvider = ({ children }: { children: ReactNode }) => {
    const { status, data } = useSession();
    const [user, dispatch] = useReducer(userReducer, initialState);

    // function  should run whenever the session status changes
    useEffect(() => {
        switch (status) {
            case "unauthenticated":
                dispatch({ type: "CLEAR_DATA" });
                break;
            case "authenticated":
                getUserData(data.user.id)
                    .then(userData => {
                        dispatch({
                            type: "SET_INITIAL_STATE",
                            payload: userData,
                        });
                    })
                    .catch(err => console.warn(err));
                break;
        }
    }, [status, dispatch, data]);

    const value = useMemo(() => ({ ...user, dispatch }), [user]);
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === null)
        throw new Error("useUserContext must be used within UserProvider");
    return context;
};

export default UserProvider;
