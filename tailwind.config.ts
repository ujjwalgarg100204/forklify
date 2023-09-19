import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                orange: "#BC6C25",
                "light-orange": "#DDA15E",
                "light-yellow": "#FEFAE0",
                green: "#283618",
                "light-green": "#606C38",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            fontSize: {
                "4.5xl": "2.5rem",
            },
        },
    },
    plugins: [],
};
export default config;
