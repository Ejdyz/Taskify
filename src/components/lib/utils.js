import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GoogleIcon, GitHubIcon } from "../icons/Icons"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getProviderIcon(providerId, props) {
  switch (providerId) {
    case "google":
      return <GoogleIcon {...props}/>
    case "github":
      return <GitHubIcon {...props}/>
    default:
      break;
  }
}

/**
 * Formats (primarily ISO 8601) date string to Czech date and time format with Czech timezone.
 * 
 * @param {string} isoDateStr - The ISO date string to be formatted.
 * @returns {string} The formatted date and time string in Czech format.
 */
export const formatDateToCzech = (isoDateStr, options = undefined) => {
  const date = new Date(isoDateStr)

  if (Number.isNaN(date)) {
      return "Invalid date"
  }

  const formatterOptions = options || {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Europe/Prague",
  }

  const formatter = new Intl.DateTimeFormat("cs-CZ", formatterOptions)
  return formatter.format(date)
}

