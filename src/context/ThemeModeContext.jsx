import { createContext, useContext, useState } from "react";

export const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export default ThemeModeProvider

