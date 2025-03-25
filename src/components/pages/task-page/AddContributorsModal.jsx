"use client"
// Hooks
import { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/navigation"
// Utils
import { addToast } from "@heroui/toast"
// Components
import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal'
import { Tooltip } from "@heroui/tooltip"
import { Input } from '@heroui/input'
import { User } from '@heroui/user'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { Spinner } from "@heroui/spinner"
// Icons
import { PlusIcon, TrashIcon } from '@/components/icons/Icons'
import { Avatar } from "@heroui/avatar"

export default function AddContributorsModal(props) {
  const contributors = props.contributors
  const taskId = props.taskId
  const [isFocused, setIsFocused] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [isFindingUserLoading, setIsFindingUserLoading] = useState(false)
  const [foundUsers, setFoundUsers] = useState([])
  const debounceTimeout = useRef(null)

  async function handleRemoveContributor(email) {
    setLoading(true)
    try {
      const res = await fetch("/api/task/contributor/remove", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: taskId,
          email: email
        })
      })

      const response = await res.json()
      if (!response.success) {
        addToast({ color: "danger", title: response.message })
      } else {
        addToast({ color: "success", title: "User removed" })
        router.refresh()
      }
    } catch (error) {
      console.error(error)
      addToast({ color: "danger", title: "An error occurred while removing user" })
    }
    setLoading(false)
  }

  async function handleAddContributor(email) {
    setLoading(true)
    try {
      const res = await fetch("/api/task/contributor/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: taskId,
          email: email
        })
      })

      const response = await res.json()
      if (!response.success) {
        setMessage({ type: "error", content: response.message })
      } else {
        addToast({ color: "success", title: "User added" })
        setEmail('')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
      addToast({ color: "danger", title: "An error occurred while adding user" })
    }
    setLoading(false)
  }

  function handleEmailChange(value) {
    if (contributors.some((contributor) => contributor.email === value)) {
      setMessage({ type: 'error', content: 'User already added' })
    } else {
      setMessage(null)
    }

    setEmail(value)

    if (value.trim() !== "") {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      debounceTimeout.current = setTimeout(() => {
        fetchAvailableContributors(value)
      }, 200)
    }
  }

  const fetchAvailableContributors = async (email) => {
    setIsFindingUserLoading(true)
    try {
      const res = await fetch("/api/user/find?" + new URLSearchParams({ email: email }), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const response = await res.json()
      if (!response.success) {
        setMessage({ type: "error", content: response.message })
      } else {
        const filteredUsers = response.body.filter(
          (user) => !contributors.some((contributor) => contributor.email === user.email)
        )
        setFoundUsers(filteredUsers)
      }
    } catch (error) {
      console.error(error)
      addToast({ color: "danger", title: "An error occurred while fetching users" })
    }
    setIsFindingUserLoading(false)
  }

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])



  return (
    <>
      <Button onPress={onOpen} {...props}>
        {props.children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            Contributors
          </ModalHeader>
          <ModalBody>
            <Tooltip
              isOpen={isFocused && email.length > 2}
              placement="bottom"
              className="w-full"
              classNames={{ content: "w-full", base: "w-full" }}
              size="lg"
              content={
                <div className="w-full flex flex-col gap-2">
                  {foundUsers.length === 0 &&
                    <div className="flex justify-center items-center text-gray-500 p-4 px-8">
                      No users found
                    </div>
                  }
                  {foundUsers?.map(user => (
                    <Button
                      variant="light"
                      key={user.id}
                      className="h-12 p-1 min-w-56 flex justify-start"
                      startContent={<Avatar src={user.image} className="aspect-square" />}
                      isDisabled={loading}
                      onPress={() => handleAddContributor(user.email)}
                    >
                      <div className="flex flex-col text-start">
                        <p>{user.name}</p>
                        <p className="text-gray-500 text-tiny">{user.email}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              }>
              <Input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                label="Enter email"
                onValueChange={handleEmailChange}
                value={email} variant="bordered"
                isInvalid={message?.type === "error"}
                errorMessage={message?.content}
                onKeyDown={(e) => e.key === "Enter" && handleAddContributor(email)}
                endContent={isFindingUserLoading && <Spinner size="sm" color="primary" />}
              />
            </Tooltip>
            <Button color="primary" isLoading={loading} fullWidth startContent={<PlusIcon />} onPress={() => handleAddContributor(email)}>Add</Button>
            <ScrollShadow className='max-h-56'>
              <div className='flex flex-col divide-y divide-border'>
                {contributors.map((contributor) => (
                  <div key={contributor.email} className='flex items-center justify-between py-2'>
                    <User name={contributor.name} description={contributor.email} avatarProps={{ src: contributor.image }} />
                    <Button onPress={() => handleRemoveContributor(contributor.email)} isIconOnly radius='full' className='w-6 min-w-6 h-6' variant="light" color="danger"><TrashIcon className={"size-4"} /></Button>
                  </div>
                ))}
              </div>
            </ScrollShadow>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" color='danger' onPress={onOpenChange}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
