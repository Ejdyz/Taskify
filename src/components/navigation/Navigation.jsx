// Utils
import { auth } from "@/lib/auth/auth";
// Components
import {Navbar, NavbarBrand} from "@heroui/navbar";
import AccountMenu from "./AccountMenu"
import SignedOutNavigation from "./NavbarSignInButton"
// Icons
import { AcmeIcon } from "../icons/Icons"

const Navigation = async () => {
  const session = await auth();
  return (  
    <Navbar shouldHideOnScroll>
      <NavbarBrand as="a" href="/">
        <AcmeIcon />
        <p className="font-bold text-inherit">Taskify</p>
      </NavbarBrand>
      {!session 
        ? <SignedOutNavigation />
        : <AccountMenu user={session.user} />
     }
    </Navbar>
  );
}
 
export default Navigation;