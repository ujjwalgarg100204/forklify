import "./globals.css";

import Footer from "@components/Footer";
import Header from "@components/Header";
import type { Metadata } from "next";
import AuthProvider from "./contexts/AuthProvider";
import MUIThemeRegistryContext from "./contexts/MUIThemeRegistry/ThemeRegistry";
import SWRProvider from "./contexts/SWRProvider";
import UserProvider from "./contexts/UserProvider/UserProvider";

export const metadata: Metadata = {
    title: "Forklify - Recipe Blogging Platform",
    description:
        "Discover Forklify: Your Ultimate Recipe Sharing Destination. " +
        "Explore a Variety of Culinary Creations, Connect with Food Lovers, and " +
        "Create Recipe Collections. Join Now and Indulge in Gastronomic Delights",
    other: {
        "google-site-verification":
            "F8ZfoimM4VrJSdKrEAS-RPOCAs7xhDcuuLeI59JvW_Q",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="font-poppins">
                <MUIThemeRegistryContext>
                    <AuthProvider>
                        <SWRProvider>
                            <UserProvider>
                                <Header />
                                {children}
                                <Footer />
                            </UserProvider>
                        </SWRProvider>
                    </AuthProvider>
                </MUIThemeRegistryContext>
            </body>
        </html>
    );
}
