"use client"
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, SystemIcon } from "../icons/Icons";

const ThemeChanger = () => {
  const { theme,resolvedTheme,setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function toggleTheme(newTheme) {
    setTheme(newTheme)
  }

  return (
    <Select
      defaultSelectedKeys={[theme]}
      size="sm"
      label="Theme select"
      onChange={(e) => toggleTheme(e.target.value)}
    >
      <SelectItem value="light" endContent={<SunIcon />} key="light">Light</SelectItem>
      <SelectItem value="dark" endContent={<MoonIcon />} key="dark">Dark</SelectItem>
      <SelectItem value="system" endContent={<SystemIcon />} key="system">System</SelectItem>
    </Select>
  )
}
export default ThemeChanger
