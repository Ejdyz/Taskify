
import { HeroUIProvider } from "@heroui/system"
import {ThemeProvider} from "next-themes";

const Providers = ({children}) => {
  return ( 
    <HeroUIProvider >
      <ThemeProvider attribute="data-theme" defaultTheme="system">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
 
export default Providers;