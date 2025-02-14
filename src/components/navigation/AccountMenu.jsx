"use client"
// Utils
import { signOut } from "next-auth/react"
// Components
import ThemeChanger from "@/components/navigation/ThemeChanger"
import { Avatar } from "@heroui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover"
import { User } from "@heroui/user"
import { Divider } from "@heroui/divider"
import { Button } from "@heroui/button"
import { NavbarContent, NavbarItem } from "@heroui/navbar"
// Icons
import { LogoutIcon } from "../icons/Icons"

const AccountMenu = ({ user }) => {
  return (
    <>
      <NavbarContent justify="end">
        <Popover placement="bottom-center">
          <NavbarItem>
            <PopoverTrigger>
              <Avatar size="sm" isBordered src={user.image} />
            </PopoverTrigger>
          </NavbarItem>
          <PopoverContent className="p-4 flex flex-col w-full gap-4" placement="bottom-center">
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user.image,
                size: "sm",
              }}
              className="cursor-default"
              description={user.email}
              name={user.name}
            />
            <Divider />
            <ThemeChanger />
            <Button onPress={signOut} fullWidth size="sm" color="danger" variant="faded" endContent={<LogoutIcon className={"size-4 rotate-180"} />}>
              Log out
            </Button>
          </PopoverContent>
        </Popover>
      </NavbarContent>
    </>
  )
}

export default AccountMenu