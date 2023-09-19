export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXTAUTH_SECRET: string;
            DATABASE_URL: string;
            GOOGLE_ID: string;
            GOOGLE_SECRET: string;
            GITHUB_ID: string;
            GITHUB_SECRET: string;
            LINKEDIN_ID: string;
            LINKEDIN_SECRET: string;
        }
    }
}
