import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#283618",
            light: "#606b38",
        },
        secondary: {
            main: "#bc6c25",
        },
        success: {
            main: "#4caf50",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
});

export default theme;
