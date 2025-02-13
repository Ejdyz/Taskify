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