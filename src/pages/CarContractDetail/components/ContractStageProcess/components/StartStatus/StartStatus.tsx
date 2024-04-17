import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
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
import {useShallow} from 'zustand/react/shallow'
import useUserLoginInfoStore from '../../../../../../hooks/user-login-info.store'
import callApi from '../../../../../../utils/api'
import {useForm} from 'react-hook-form'

interface StartStatusProps {
  contract: CarContract
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  setContract: React.Dispatch<React.SetStateAction<CarContract | undefined>>
}

type fulfillmentInfo = {
  is_cleaning_fee: boolean
  is_deodorization_fee: boolean
  over_limit_km: number
  over_time_hours: number
}

function StartStatus({contract, setIsLoaded, setContract}: StartStatusProps) {
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    clearErrors
  } = useForm<fulfillmentInfo>()

  const {
    isOpen: isOpenEndConfirm,
    onOpen: onOpenEndConfirm,
    onClose: onCloseEndConfirm
  } = useDisclosure()

  const handleEndContract = async (data: fulfillmentInfo) => {
    if (!contract || !userInfo) return

    if (userInfo?.id !== contract.owner.id) return

    try {
      setIsLoaded(true)

      console.log(data)
      await callApi(`/api/v1/car-contracts/${contract.id}/end`, 'POST', {
        over_limit_km: Number(data.over_limit_km) ?? 0,
        over_time_hours: Number(data.over_time_hours) ?? 0,
        is_cleaning_fee: data.is_cleaning_fee,
        is_deodorization_fee: data.is_deodorization_fee
      })

      setContract(value => (value ? {...value, is_processing: true} : undefined))

      setIsLoaded(false)
      onCloseEndConfirm()
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
          Hợp đồng đã bắt đầu.
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Người thuê đã nhận được xe và đã xác nhận việc nhận xe.
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Đến ngày kết thúc hợp đồng, khi chủ xe xác nhận việc trả xe, các khoản phí phụ thu hệ
          thống sẽ thanh toán cho chủ xe và số tiền còn lại sẽ được hoàn lại cho người thuê.
        </Text>
      </VStack>
      <Spacer />
      {userInfo?.id === contract.owner.id && (
        <Box
          fontWeight="bold"
          w="100px"
          as="button"
          bg="common.info"
          p="10px"
          borderRadius="5px"
          alignSelf="flex-end"
          onClick={onOpenEndConfirm}
          sx={contract.is_processing ? styles.disabled_button : undefined}
        >
          <Text fontSize="14px" color="white">
            Kết thúc
          </Text>
        </Box>
      )}
      <Modal isOpen={isOpenEndConfirm} onClose={onCloseEndConfirm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="500">Xác nhận kết thúc hợp đồng</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(handleEndContract)} id="ff-form">
              <VStack gap="30px">
                <Text color="text.gray">
                  Bạn có chắc chắn muốn kết thúc hợp đồng này? Hành động này không thể hoàn tác.
                </Text>
                <VStack w="100%" alignItems="flex-start">
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="20px"
                  >
                    <FormLabel m="0" minW="120px">
                      Số giờ quá hạn:
                    </FormLabel>
                    <Input
                      type="number"
                      _focusVisible={{
                        boxShadow: 'none'
                      }}
                      {...register('over_time_hours', {
                        required: {
                          value: true,
                          message: 'Vui lòng nhập số giờ quá hạn'
                        },
                        min: {
                          value: 0,
                          message: 'Số giờ quá hạn không được nhỏ hơn 0'
                        },
                        max: {
                          value: 5,
                          message: 'Số giờ quá hạn không được lớn hơn 5'
                        }
                      })}
                    />
                  </FormControl>
                  {errors.over_time_hours && (
                    <Text
                      pl="140px"
                      minH="16px"
                      fontWeight="500"
                      fontSize="12px"
                      color="text.error"
                    >
                      {errors.over_time_hours.message}
                    </Text>
                  )}
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="20px"
                  >
                    <FormLabel m="0" minW="120px">
                      Số km quá hạn:
                    </FormLabel>
                    <Input
                      type="number"
                      _focusVisible={{
                        boxShadow: 'none'
                      }}
                      {...register('over_limit_km', {
                        required: {
                          value: true,
                          message: 'Vui lòng nhập số km quá hạn'
                        },
                        min: {
                          value: 0,
                          message: 'Số km quá hạn không được nhỏ hơn 0'
                        }
                      })}
                    />
                  </FormControl>
                  {errors.over_limit_km && (
                    <Text
                      pl="140px"
                      minH="16px"
                      fontWeight="500"
                      fontSize="12px"
                      color="text.error"
                    >
                      {errors.over_limit_km.message}
                    </Text>
                  )}
                  <HStack w="100%">
                    <Checkbox
                      _focusVisible={{
                        boxShadow: 'none'
                      }}
                      flex={1}
                      {...register('is_cleaning_fee')}
                    >
                      <Text fontWeight="500">Phí vệ sinh</Text>
                    </Checkbox>
                    <Checkbox
                      _focusVisible={{
                        boxShadow: 'none'
                      }}
                      flex={1}
                      {...register('is_deodorization_fee')}
                    >
                      <Text fontWeight="500">Phí khử mùi</Text>
                    </Checkbox>
                  </HStack>
                </VStack>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button form="ff-form" type="submit" bg="common.info" mr={3}>
              Kết thúc
            </Button>
            <Button
              onClick={() => {
                reset()
                clearErrors()
                onCloseEndConfirm()
              }}
            >
              Hủy
            </Button>
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

export default StartStatus
