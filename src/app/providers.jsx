
import { HeroUIProvider } from "@heroui/system"
import {ThemeProvider} from "next-themes";
import { ToastProvider } from "@heroui/toast";
const Providers = ({children}) => {
  return ( 
    <HeroUIProvider >
      <ThemeProvider attribute="data-theme" defaultTheme="system">
        <ToastProvider /> 
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
 
export default Providers;