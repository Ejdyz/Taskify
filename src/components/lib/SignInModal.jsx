"use client"
// Hooks
import { useEffect, useState } from "react"
import { signIn, getProviders} from "next-auth/react";
// Components
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/modal";
import { getProviderIcon } from "../lib/utils"

const SignInModal = (props) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const providers = await getProviders()
      setProviders(providers)
    }
    fetchData()
  }, [])

  return(
    <>
      <Button onPress={onOpen} {...props}>
        {props.children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalBody>
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  fullWidth
                  variant="ghost"
                  size="lg"
                  onPress={() => signIn(provider.id)}
                >
                  {getProviderIcon(provider.id, {color: "var(--foreground)"})} <span>Continue with <b>{provider.name}</b></span>
                </Button>
              </div>
            ))}
          </ModalBody>
          <ModalFooter/>
        </ModalContent>
      </Modal>
    </>
  )
}
export default SignInModal;