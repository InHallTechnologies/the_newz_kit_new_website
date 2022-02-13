import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { Provider } from "../context/appContext";
import "../styles/globals.css";

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
    return (
        <Provider>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
