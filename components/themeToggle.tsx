"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { invoke } from "@tauri-apps/api/tauri";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleOnClick = () => {
    let newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    invoke("plugin:theme|set_theme", {
      theme: newTheme,
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleOnClick}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
