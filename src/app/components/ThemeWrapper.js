"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/lib/themeSlice";

export default function ThemeWrapper({ children }) {
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            dispatch(setTheme(savedTheme));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    return (
        <div className={`app ${mode}`}>
            {children}
        </div>
    );
}