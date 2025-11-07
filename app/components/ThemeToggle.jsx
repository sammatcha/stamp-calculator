'use client';

import { MoonStar, SunMedium, SunMoonIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle(){
    const [theme, setTheme] = useState(
        ()=>
            typeof window !== 'undefined' &&
        (localStorage.getItem("theme") ||
    
    (window.matchMedia("(prefers-color-scheme: dark))").matches ? "dark" : "light"))
    )

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
     
    return(
        <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className = 'p-2 bg-black'
        >
        {theme === "dark" ? <MoonStar/> : <SunMedium/>}
        </button>
    )
}
