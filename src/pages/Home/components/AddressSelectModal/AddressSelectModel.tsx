import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select
} from '@chakra-ui/react'

interface AddressModelProps {
  isOpen: boolean
  onClose: () => void
}

function AddressSelectModel({isOpen, onClose}: AddressModelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Địa điểm</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Tỉnh/Thành phố</FormLabel>
            <Select
              placeholder="Select option"
              _focusVisible={{
                boxShadow: 'none'
              }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quận/Huyện</FormLabel>
            <Select
              placeholder="Select option"
              _focusVisible={{
                boxShadow: 'none'
              }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button>Tiếp tục</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddressSelectModel
