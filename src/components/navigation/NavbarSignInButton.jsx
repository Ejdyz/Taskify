// Components
import SignInModal from "../lib/SignInModal";
import { NavbarContent, NavbarItem } from "@heroui/navbar";

const SignedOutNavigation = () => {
  return(
    <NavbarContent justify="end">
      <NavbarItem>
        <SignInModal color="primary" variant="flat" >
          Sign in
        </SignInModal>
      </NavbarItem>
    </NavbarContent>  
  )
}
export default SignedOutNavigation;