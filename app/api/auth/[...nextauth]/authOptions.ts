import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@utils/db";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
    pages: {
        newUser: "/login",
        signIn: "/login",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        LinkedinProvider({
            clientId: process.env.LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user?.id;
            }
            return token;
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            // @ts-ignore
            session.user.id = token.id;

            return session;
        },
    },
    session: { strategy: "jwt" },
    debug: process.env.NODE_ENV === "development",
};
