import { useEffect, useState } from "react";

function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove("dark");
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            className="top-4 right-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
}

export default DarkModeToggle;
