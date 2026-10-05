"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/lib/themeSlice";

export default function ThemeToggle() {
    const dispatch = useDispatch();

    const mode = useSelector(
        (state) => state.theme.mode
    );

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="theme-toggle"
        >
            {mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}