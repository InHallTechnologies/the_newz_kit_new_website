import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useEffect } from "react";
import { Provider } from "../context/appContext";
import "../styles/globals.css";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import {analytics} from "../backend/firebaseHandler";
import { logEvent, setCurrentScreen } from 'firebase/analytics';
import { hotjar } from 'react-hotjar'



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
        const logCurrentEvents = (url) => {
            logEvent(analytics, 'screen_view');
            setCurrentScreen(analytics, url);
            logEvent(analytics, window.location.hostname);
        }
        logCurrentEvents(window.location.pathname)
        hotjar.initialize(2726846,6)

        Router.events.on("routeChangeStart", progress.start);
        Router.events.on("routeChangeComplete", (url) => {
            progress.finish();
            logCurrentEvents(url);
        });
        Router.events.on("routeChangeError", progress.finish);

        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "aprldt99mx");

        return () => {
            Router.events.off("routeChangeComplete", () => {
                logCurrentEvents(url);
            });
        };
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
