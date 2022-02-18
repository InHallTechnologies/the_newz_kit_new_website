import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useEffect } from "react";
import { Provider } from "../context/appContext";
import "../styles/globals.css";
import NProgress from "nprogress";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";



const theme = createTheme({
    palette: {
        primary: {
            main: "#E9494B",
        },
        secondary: {
            main: "#E41B1E",
        },
    },
});

function MyApp({ Component, pageProps }) {

    const progress = new ProgressBar({
        size: 5,
        color: "#E9494B",
        className: "bar-of-progress",
        delay: 100,
    });

    useEffect(() => {
        Router.events.on("routeChangeStart", progress.start);
        Router.events.on("routeChangeComplete", progress.finish);
        Router.events.on("routeChangeError", progress.finish);
    }, []);

    return (
        <Provider>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
