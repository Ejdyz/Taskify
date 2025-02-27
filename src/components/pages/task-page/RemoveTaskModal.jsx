"use client"
// Hooks
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToast } from '@heroui/toast';

// Components
import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal'
// Icons
import { TrashIcon } from '@/components/icons/Icons';

export default function RemoveTaskModal(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleRemove() {
    setLoading(true)
    const response = await fetch(`/api/task/remove`, {
      method: 'POST',
      body: JSON.stringify({ 
        taskId: props.taskId,
        authorId: props.authorId,
      })
    })

    
    
    const res = await response.json()
    if (res.success) {
      addToast({title: "Task removed", color: 'success'})
      onOpenChange()
      if (props.redirect){
        router.push('/')
      }else{
        router.refresh()
      }
    }else{
      addToast({title: res.message, color: 'danger'})
    }
    

    setLoading(false)
  }

  return (
    <>
      <Button onPress={onOpen} {...props}>
        {props.children}
      </Button>
      <Modal
        isDismissable={!loading}
        isKeyboardDismissDisabled={!loading}
        hideCloseButton={loading}
        isOpen={isOpen} onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className='text-center'>
            Are you shure you want to remove this task?
          </ModalHeader>
          <ModalBody className='text-center text-border'>
            This action cannot be undone.
          </ModalBody>
          <ModalFooter className=''>
            <Button isDisabled={loading} variant="solid" fullWidth color='primary' onPress={onOpenChange}>Cancel</Button>
            <Button isLoading={loading} variant="bordered" fullWidth color='danger' endContent={<TrashIcon />} onPress={handleRemove}>Remove</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
