import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useEffect } from "react";
import { Provider } from "../context/appContext";
import "../styles/globals.css";
import NProgress from "nprogress";
import Router from "next/router";

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
    useEffect(() => {
        const delay = 500; // in milliseconds
        let timer;
        const load = () => {
            timer = setTimeout(function () {
                NProgress.start();
            }, delay);
        };
        const stop = () => {
            clearTimeout(timer);
            NProgress.done();
        };
        Router.events.on("routeChangeStart", () => NProgress.start());
        Router.events.on("routeChangeComplete", () => NProgress.done());
        Router.events.on("routeChangeError", () => NProgress.done());
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
