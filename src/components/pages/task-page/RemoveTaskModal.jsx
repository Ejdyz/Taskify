"use client"
// Hooks
import { useState } from 'react';
// Components
import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal'
// Icons
import { TrashIcon } from '@/components/icons/Icons';

export default function RemoveTaskModal(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  function handleRemove() {
    console.log(props.taskId)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange()
    }, 1000)
    // Add contributor
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
