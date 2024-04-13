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
  SystemStyleObject,
  Text,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'

import {IoIosInformationCircleOutline} from 'react-icons/io'
import {CarContract} from '../../../../../../types/api-response.type'
import useUserLoginInfoStore from '../../../../../../hooks/user-login-info.store'
import useContractStore from '../../../../../../hooks/contract.store'
import callApi from '../../../../../../utils/api'

interface WaitingApprovalStatusOwnerProps {
  contract: CarContract
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  setContract: React.Dispatch<React.SetStateAction<CarContract | undefined>>
}

export function WaitingApprovalStatusOwner({
  contract,
  setContract,
  setIsLoaded
}: WaitingApprovalStatusOwnerProps) {
  const totalPrice = contract.price_per_day * contract.num_of_days
  const toast = useToast()

  const userInfo = useUserLoginInfoStore(state => state.userInfo)
  const myCarContract = useContractStore(state => state.mycarContract)
  const address = useContractStore(state => state.address)

  const {
    isOpen: isOpenRejectConfirm,
    onOpen: onOpenRejectConfirm,
    onClose: onCloseRejectConfirm
  } = useDisclosure()

  const handleApproveContract = async () => {
    if (userInfo?.id !== contract.owner.id) return

    if (!address) {
      toast({
        title: 'Vui lòng kết nối ví',
        status: 'info',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      })

      return
    }

    if (!contract || !userInfo || !myCarContract) return

    try {
      setIsLoaded(true)

      const txHash = await myCarContract.pay({
        contract_id: contract.id,
        amount: totalPrice * 0.25,
        email: userInfo.email
      })

      if (txHash) {
        await callApi(`/api/v1/car-contracts/${contract.id}/payment/confirm`, 'POST', {
          tx_hash: txHash
        })
        const {data: newCarContract} = await callApi<CarContract>(
          `/api/v1/car-contracts/${contract.id}/detail`,
          'GET',
          null
        )
        setContract(newCarContract)
      } else {
        toast({
          title: 'Đã xảy ra lỗi khi tạo hợp đồng thuê xe. Vui lòng thử lại sau.',
          status: 'error',
          duration: 3000,
          position: 'top-right',
          isClosable: true
        })
      }

      setIsLoaded(false)
    } catch (error) {
      setIsLoaded(false)
      toast({
        title: 'Đã xảy ra lỗi khi tạo hợp đồng thuê xe. Vui lòng thử lại sau.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      })
      console.log(error)
    }
  }

  const handleRejectContract = async () => {
    if (!contract || !userInfo) return

    if (userInfo?.id !== contract.owner.id) return

    try {
      setIsLoaded(true)

      await callApi(`/api/v1/car-contracts/${contract.id}/reject`, 'POST', {})

      const {data: newCarContract} = await callApi<CarContract>(
        `/api/v1/car-contracts/${contract.id}/detail`,
        'GET',
        null
      )
      setContract(newCarContract)

      setIsLoaded(false)
      onCloseRejectConfirm()
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
    <HStack w="100%" justifyContent="space-between">
      <VStack alignItems="flex-start" gap="0">
        <Text fontWeight="500" mb="5px">
          Xác nhận đồng ý với hợp đồng thuê xe
        </Text>
        <Text>
          Số tiền cần thanh toán:{' '}
          <Box as="span" fontWeight="500">
            {totalPrice * 0.25}ETH
          </Box>
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Chủ xe phải ứng số tiền tương đương 25% giá trị hợp đồng. Số tiền sẽ được hoàn lại khi hợp
          đồng bắt đầu có hiệu lực.
        </Text>
      </VStack>
      <HStack alignSelf="flex-end">
        <Box
          fontWeight="bold"
          w="100px"
          as="button"
          bg="common.info"
          p="10px"
          borderRadius="5px"
          onClick={handleApproveContract}
        >
          <Text fontSize="14px" color="white">
            Xác nhận
          </Text>
        </Box>
        <Box
          fontWeight="bold"
          w="100px"
          as="button"
          bg="common.error"
          p="10px"
          borderRadius="5px"
          onClick={onOpenRejectConfirm}
        >
          <Text fontSize="14px" color="white">
            Từ chối
          </Text>
        </Box>
      </HStack>
      <Modal isOpen={isOpenRejectConfirm} onClose={onCloseRejectConfirm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="500">Xác nhận từ chối hợp đồng</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color="text.gray">
              Bạn có chắc chắn muốn từ chối hợp đồng này không? Hành động này không thể hoàn tác.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="common.error" mr={3} onClick={handleRejectContract}>
              Từ chối
            </Button>
            <Button onClick={onCloseRejectConfirm}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  )
}

interface WaitingApprovalStatusRenterProps {
  contract: CarContract
}

export function WaitingApprovalStatusRenter({contract}: WaitingApprovalStatusRenterProps) {
  return (
    <HStack w="100%" justifyContent="space-between">
      <Text>Hợp đồng đang chờ xác nhận từ chủ xe</Text>
    </HStack>
  )
}

type Styles = {
  note: SystemStyleObject
  status_tag: SystemStyleObject
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
  }
}
