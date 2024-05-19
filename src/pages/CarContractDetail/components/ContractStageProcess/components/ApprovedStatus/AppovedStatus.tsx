import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  SystemStyleObject,
  Text,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import {IoIosInformationCircleOutline} from 'react-icons/io'
import {CarContract} from '../../../../../../types/api-response.type'
import useUserLoginInfoStore from '../../../../../../hooks/user-login-info.store'
import callApi from '../../../../../../utils/api'
import {useShallow} from 'zustand/react/shallow'

interface AppovedStatusProps {
  contract: CarContract
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  setContract: React.Dispatch<React.SetStateAction<CarContract | undefined>>
}

export function AppovedStatus({contract, setIsLoaded, setContract}: AppovedStatusProps) {
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))
  const toast = useToast()

  const {
    isOpen: isOpenCancelConfirm,
    onOpen: onOpenCancelConfirm,
    onClose: onCloseCancelConfirm
  } = useDisclosure()

  const {
    isOpen: isOpenStartConfirm,
    onOpen: onOpenStartConfirm,
    onClose: onCloseStartConfirm
  } = useDisclosure()

  const handleCancelContract = async () => {
    if (!contract || !userInfo) return

    try {
      setIsLoaded(true)

      if (userInfo.id === contract.owner.id) {
        await callApi(`/api/v1/car-contracts/${contract.id}/owner/cancel`, 'POST', {})
      } else {
        await callApi(`/api/v1/car-contracts/${contract.id}/renter/cancel`, 'POST', {})
      }

      setContract(value => (value ? {...value, is_processing: true} : undefined))

      setIsLoaded(false)
      onCloseCancelConfirm()
    } catch (error) {
      setIsLoaded(false)
      toast({
        title: 'Đã xảy ra lỗi khi từ chối hợp đồng thuê xe. Vui lòng thử lại sau.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      })
      console.log(error)
    }
  }

  const handleStartContract = async () => {
    if (!contract || !userInfo) return

    if (userInfo?.id !== contract.renter.id) return

    try {
      setIsLoaded(true)

      await callApi(`/api/v1/car-contracts/${contract.id}/start`, 'POST', {})

      setContract(value => (value ? {...value, is_processing: true} : undefined))

      setIsLoaded(false)
      onCloseStartConfirm()
    } catch (error) {
      setIsLoaded(false)
      toast({
        title: 'Đã xảy ra lỗi khi từ chối hợp đồng thuê xe. Vui lòng thử lại sau.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      })
      console.log(error)
    }
  }

  return (
    <HStack w="100%">
      <VStack alignItems="flex-start" gap="0">
        <Text fontWeight="500" mb="5px">
          Hợp đồng đã được xác nhận
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Đến ngày bắt đầu hợp đồng, người thuê khi nhận được xe sẽ xác nhận việc nhận xe và chủ xe
          sẽ được hoàn số tiền đã ứng tương đương 25% giá trị hợp đồng.
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Nếu chủ xe hủy hợp đồng trước ngày bắt đầu hợp đồng, số tiền đã ứng sẽ được đền bù cho
          người thuê xe.
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Nếu người thuê hủy hợp đồng trước ngày bắt đầu hợp đồng, chủ xe sẽ nhận được số tiền đền
          bù tương ứng với 25% giá trị hợp đồng.
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Nếu hệ thống quyết định hủy hợp đồng, cả hai bên sẽ nhận được toàn bộ số tiền.
        </Text>
      </VStack>
      <Spacer />
      <Box
        fontWeight="bold"
        w="100px"
        as="button"
        bg="common.error"
        p="10px"
        borderRadius="5px"
        alignSelf="flex-end"
        onClick={onOpenCancelConfirm}
        sx={contract.is_processing ? styles.disabled_button : undefined}
      >
        <Text fontSize="14px" color="white">
          Hủy
        </Text>
      </Box>
      {userInfo?.id === contract.renter.id && (
        <Box
          fontWeight="bold"
          w="100px"
          as="button"
          bg="common.info"
          p="10px"
          borderRadius="5px"
          alignSelf="flex-end"
          onClick={onOpenStartConfirm}
          sx={
            contract.is_processing || new Date(contract.start_date).getTime() > new Date().getTime()
              ? styles.disabled_button
              : undefined
          }
        >
          <Text fontSize="14px" color="white">
            Bắt đầu
          </Text>
        </Box>
      )}
      <Modal isOpen={isOpenCancelConfirm} onClose={onCloseCancelConfirm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="500">Xác nhận từ chối hợp đồng</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color="text.gray">
              Bạn sẽ mất phí bằng 25% giá trị hợp đồng, bạn có chắc chắn muốn hủy hợp đồng này
              không? Hành động này không thể hoàn tác.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="common.error" mr={3} onClick={handleCancelContract}>
              Từ chối
            </Button>
            <Button onClick={onCloseCancelConfirm}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenStartConfirm} onClose={onCloseStartConfirm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="500">Xác nhận bắt đầu hợp đồng</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color="text.gray">
              Bạn có chắc chắn muốn bắt đầu hợp đồng này? Hành động này không thể hoàn tác.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="common.info" mr={3} onClick={handleStartContract}>
              Bắt đầu
            </Button>
            <Button onClick={onCloseStartConfirm}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  )
}

type Styles = {
  note: SystemStyleObject
  status_tag: SystemStyleObject
  disabled_button: SystemStyleObject
}

const styles: Styles = {
  note: {
    fontSize: '14px',
    color: 'text.gray',
    maxW: '600px',
    textAlign: 'justify'
  },
  status_tag: {
    color: 'white',
    minW: '100px',
    fontSize: '12px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabled_button: {
    bg: 'gray.300!important',
    pointerEvents: 'none'
  }
}
