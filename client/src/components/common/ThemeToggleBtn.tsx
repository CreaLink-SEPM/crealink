"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/src/components/ui/dropdown-menu"
import { Button } from "../ui/button"


function ThemeToggleBtn() {
    const { setTheme, theme } = useTheme()
    const darkModeColor = '#f5f5f5';

    const darkModeStyles = theme === "dark" ? { color: darkModeColor, fill: darkModeColor } : {};

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-none outline-none" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
            <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
            style={darkModeStyles} // Apply conditional styles
          />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

export default ThemeToggleBtn
