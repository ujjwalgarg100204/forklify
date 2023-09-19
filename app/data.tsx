import { RecipeCategory, RecipeRegion } from "@prisma/client";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddIcon from "@mui/icons-material/Add";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import GavelIcon from "@mui/icons-material/Gavel";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Logout from "@mui/icons-material/Logout";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import RamenDiningRoundedIcon from "@mui/icons-material/RamenDiningRounded";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import { signOut } from "next-auth/react";

export const NAV_ITEMS = [
    { title: "About Us", href: "/about-us" },
    { title: "Explore Recipes", href: "/recipe/explore" },
    { title: "Popular Recipes", href: "/recipe/popular" },
];

export const DRAWER_ITEMS = [
    {
        icon: <HomeRoundedIcon className="text-light-green" />,
        text: "Home",
        href: "/",
    },
    {
        icon: <InfoRoundedIcon className="text-light-green" />,
        text: "About Us",
        href: "/about-us",
    },
    {
        icon: <GroupsRoundedIcon className="text-light-green" />,
        text: "Meet The Devs",
        href: "/about-us#meet-the-devs",
    },
    {
        icon: <GavelIcon className="text-light-green" />,
        text: "Terms of Conditions",
        href: "/conditions",
    },
    {
        icon: <PrivacyTipIcon className="text-light-green" />,
        text: "Privacy Policy",
        href: "/privacy-policy",
    },
    {
        icon: <RamenDiningRoundedIcon className="text-light-green" />,
        text: "Recipe",
        subItems: [
            { text: "Popular Recipe", href: "/recipe/popular" },
            { text: "Explore Recipes", href: "/recipe/explore" },
            { text: "Search Recipes", href: "/recipe/search" },
            { text: "Bookmarked Recipes", href: "/user/recipe/bookmark" },
            { text: "Your Recipes", href: "/user/recipe" },
        ],
    },
    {
        icon: <FolderCopyRoundedIcon className="text-light-green" />,
        text: "Collections",
        subItems: [
            {
                text: "Explore Collections",
                href: "/collection/explore",
            },
            {
                text: "Search Collection",
                href: "/collection/search",
            },
            { text: "Your Collections", href: "/user/collection" },
        ],
    },
    {
        icon: <AccountCircleRoundedIcon className="text-light-green" />,
        text: "Profile",
        subItems: [
            { text: "Your Profile", href: "/user/profile" },
            { text: "Your Activity", href: "/user/activity" },
            { text: "Settings", href: "/user/settings" },
        ],
    },
];

export const PROFILE_MENU_ITEMS = [
    {
        icon: <AddIcon fontSize="small" />,
        title: "New Recipe",
        href: "/user/recipe/new",
    },
    {
        icon: <CreateNewFolderIcon fontSize="small" />,
        title: "New Collection",
        href: "/user/collection/new",
    },
    {
        icon: <SoupKitchenIcon fontSize="small" />,
        title: "Your Recipes",
        href: "/user/recipe/",
    },
    {
        icon: <FolderCopyRoundedIcon fontSize="small" />,
        title: "Your Collections",
        href: "/user/collection",
    },
    {
        icon: <BookmarksIcon fontSize="small" />,
        title: "Bookmarked Recipes",
        href: "/user/recipe/bookmark",
    },
    {
        icon: <Logout fontSize="small" />,
        title: "Logout",
        onClick: () => signOut({ redirect: false }),
    },
];

export const RECIPE_FILTERS = [
    {
        groupTitle: "Time",
        filterName: "time",
        filters: [
            { value: "15", labelText: "Under 15 min" },
            { value: "30", labelText: "Under 30 min" },
            { value: "60", labelText: "Under 60 min" },
        ],
    },
    {
        groupTitle: "Dish Type",
        filterName: "category",
        filters: Object.values(RecipeCategory),
    },
    {
        groupTitle: "Diet Types",
        filterName: "diet",
        filters: [
            "Vegetarian",
            "Vegan",
            "Gluten Free",
            "Ketogenic",
            "Paleo",
            "Lactos Free",
        ],
    },

    {
        groupTitle: "Region",
        filterName: "region",
        filters: Object.values(RecipeRegion),
    },
];

export const HOW_IT_WORKS_LIST_ITEMS = [
    {
        title: "Open your fridge!",
        desc: "May not realize it, but you have everything you need to make a healthy, delicious meal. How do you cook a great dinner with their ingredients? Forklify helps.",
    },
    {
        title: "Choose a recipe",
        desc: "With so many great selections, we know it might be hard to choose a meal. That's why we've made it easy to choose a recipe that meets your tastes and diet.",
    },
    {
        title: "Enjoy your dish",
        desc: "Congratulations on cooking a fantastic Forklify meal! Now sit back, relax, and enjoy your creation. Forklify believes cooking should nurture your body and soul.",
    },
];

export const RECIPE_CATEGORIES = [
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M256 32C192 32 0 64 0 192c0 35.3 28.7 64 64 64V432c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V256c35.3 0 64-28.7 64-64C512 64 320 32 256 32z" />
            </svg>
        ),
        category: "breakfast",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M160 265.2c0 8.5-3.4 16.6-9.4 22.6l-26.8 26.8c-12.3 12.3-32.5 11.4-49.4 7.2C69.8 320.6 65 320 60 320c-33.1 0-60 26.9-60 60s26.9 60 60 60c6.3 0 12 5.7 12 12c0 33.1 26.9 60 60 60s60-26.9 60-60c0-5-.6-9.8-1.8-14.5c-4.2-16.9-5.2-37.1 7.2-49.4l26.8-26.8c6-6 14.1-9.4 22.6-9.4H336c6.3 0 12.4-.3 18.5-1c11.9-1.2 16.4-15.5 10.8-26c-8.5-15.8-13.3-33.8-13.3-53c0-61.9 50.1-112 112-112c8 0 15.7 .8 23.2 2.4c11.7 2.5 24.1-5.9 22-17.6C494.5 62.5 422.5 0 336 0C238.8 0 160 78.8 160 176v89.2z" />
            </svg>
        ),
        category: "lunch",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M176 56c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24zm24 48h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zM56 176H72c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24s10.7-24 24-24zM0 283.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4zM224 200c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H248c-13.3 0-24-10.7-24-24zm-96 0c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H104c-13.3 0-24-10.7-24-24s10.7-24 24-24zm216 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H344c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24zm120 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H440c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H392c-13.3 0-24-10.7-24-24s10.7-24 24-24zM296 32h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
            </svg>
        ),
        category: "dinner",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
            >
                <path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z" />
            </svg>
        ),
        category: "dessert",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M12.874 6.999c4.737-4.27-.979-4.044.116-6.999-3.781 3.817 1.41 3.902-.116 6.999zm-2.78.001c3.154-2.825-.664-3.102.087-5.099-2.642 2.787.95 2.859-.087 5.099zm8.906 2.618c-.869 0-1.961-.696-1.961-1.618h-10.039c0 .921-1.13 1.618-2 1.618v1.382h14v-1.382zm-3.4 4.382l-1.286 8h-4.627l-1.287-8h7.2zm2.4-2h-12l2.021 12h7.959l2.02-12z" />
            </svg>
        ),
        category: "drink",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M176 56c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24zm24 48h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zM56 176H72c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24s10.7-24 24-24zM0 283.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4zM224 200c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H248c-13.3 0-24-10.7-24-24zm-96 0c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H104c-13.3 0-24-10.7-24-24s10.7-24 24-24zm216 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H344c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24zm120 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H440c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H392c-13.3 0-24-10.7-24-24s10.7-24 24-24zM296 32h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
            </svg>
        ),
        category: "brunch",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M45.1 224C29 224 16 211 16 194.9c0-1.9 .2-3.7 .6-5.6C21.9 168.3 62.8 32 240 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1H45.1zM128 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm240 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zM256 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM0 304c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48s-21.5 48-48 48H48c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16H448c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V400z" />
            </svg>
        ),
        category: "snack",
    },
    {
        icon: (
            <svg
                className="h-8 w-8 fill-white lg:h-12 lg:w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M64 32C28.7 32 0 60.7 0 96s28.7 64 64 64h1c3.7 88.9 77 160 167 160h56V128H264 88.8 64c-17.7 0-32-14.3-32-32s14.3-32 32-32H464c8.8 0 16-7.2 16-16s-7.2-16-16-16H64zM224 456c0 13.3 10.7 24 24 24h72V407.8l-64.1-22.4c-12.5-4.4-26.2 2.2-30.6 14.7s2.2 26.2 14.7 30.6l4.5 1.6C233 433.9 224 443.9 224 456zm128 23.3c36.4-3.3 69.5-17.6 96.1-39.6l-86.5-34.6c-3 1.8-6.2 3.2-9.6 4.3v69.9zM472.6 415c24.6-30.3 39.4-68.9 39.4-111c0-12.3-1.3-24.3-3.7-35.9L382.8 355.1c.8 3.4 1.2 7 1.2 10.6c0 4.6-.7 9-1.9 13.1L472.6 415zM336 128H320V320h18.3c9.9 0 19.1 3.2 26.6 8.5l133.5-92.4C471.8 172.6 409.1 128 336 128zM168 192a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
            </svg>
        ),
        category: "appetizer",
    },
];
