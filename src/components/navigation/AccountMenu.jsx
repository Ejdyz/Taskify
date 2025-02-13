"use client"
import { Button } from "@heroui/button"
import { NavbarContent, NavbarItem } from "@heroui/navbar"
import ThemeChanger from "../lib/ThemeSwitcher"
import { signOut } from "next-auth/react"
import { Avatar } from "@heroui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover"
import { User } from "@heroui/user"
import { Divider } from "@heroui/divider"

const AccountMenu = ({ user }) => {
  return (
    <>
      <NavbarContent justify="end">
        <Popover placement="bottom-start">
          <NavbarItem>
            <PopoverTrigger>
              <Avatar size="sm" isBordered src={user.image}/>
            </PopoverTrigger>
          </NavbarItem>
          <PopoverContent className="p-4 flex flex-col w-full gap-2" placement="bottom-center">
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user.image,
                size: "sm",
              }}
              className="transition-transform"
              description={user.email}
              name={user.name}
            />
            <Divider/>
            <ThemeChanger  />
            <Button fullWidth size="sm">
              Log out
            </Button>
          </PopoverContent>
        </Popover>
      </NavbarContent>
    </>
  )
}

export default AccountMenu