import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store";
import App from "./App.jsx";
import { Provider } from "react-redux";
import ThemeModeProvider from "./context/ThemeModeContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeModeProvider>
    <App />
    </ThemeModeProvider>
  </Provider>
);
