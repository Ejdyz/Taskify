"use client" 
// Hooks
import { useState } from 'react'
// Components
import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal'
import { Input } from '@heroui/input';
import { User } from '@heroui/user';
import { ScrollShadow } from '@heroui/scroll-shadow';
// Icons
import { PlusIcon, TrashIcon } from '@/components/icons/Icons';
import { addToast } from "@heroui/toast"
import { useRouter } from "next/navigation"

export default function AddContributorsModal(props) {
  const contributors = props.contributors;
  const taskId = props.taskId;

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleRemoveContributor(email) {
    // Remove contributor
    setLoading(true)
    try {
      const res = await fetch("/api/task/contributor/remove",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: taskId,
          email: email
        })
      })

      const response = await res.json();
      if(!response.success){
        addToast({ color: "danger", title: response.message})
      }else {
        addToast({ color: "success", title: "User removed"})
        router.refresh()
      }
    
    } catch (error) {
      console.error(error)
      addToast({ color: "danger", title: "An error occurred while removing user"})
    }
    setLoading(false)
  }

  async function handleAddContributor() {
    // Add contributor
    setLoading(true)
    try {
      const res = await fetch("/api/task/contributor/add",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: taskId,
          email: email
        })
      })

      const response = await res.json();
      if(!response.success){
        setMessage({ type: "error", content: response.message})
      }else{
        addToast({ color: "success", title: "User added"})
        setEmail('')
        router.refresh()
      }

    
    } catch (error) {
      console.error(error)
      addToast({ color: "danger", title: "An error occurred while adding user"})
    }
    setLoading(false)
  }

  function handleEmailChange(value) {
    if (contributors.some((contributor) => contributor.email === value)) {
      setMessage({ type: 'error', content: 'User already added' })
    }else{
      setMessage(null)
    }
    setEmail(value)
  }

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
            <Input 
              label="Enter email" 
              onValueChange={handleEmailChange} 
              value={email} variant="bordered" 
              isInvalid={message?.type === "error"} 
              errorMessage={message?.content} 
              onKeyDown={(e) => e.key === "Enter" && handleAddContributor()}
            />
            <Button color="primary" isLoading={loading} fullWidth startContent={<PlusIcon />} onPress={handleAddContributor}>Add</Button>
            <ScrollShadow className='max-h-56' >
              <div className='flex flex-col divide-y divide-border'>
                {/* List of contributors */}
                {contributors.map((contributor) => (
                  <div key={contributor.email} className='flex items-center justify-between  py-2'>
                    <User name={contributor.name} description={contributor.email} avatarProps={{ src: contributor.image }}/>
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
