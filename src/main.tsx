import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./providers/AppProvider";
import App from "./App.tsx";
import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>,
);
