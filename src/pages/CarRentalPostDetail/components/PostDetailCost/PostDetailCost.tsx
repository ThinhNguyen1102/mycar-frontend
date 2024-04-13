import {
  Button,
  Divider,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {add, differenceInDays, format} from 'date-fns'
import DateSelectModal from '../../../../components/DateSelectModal'
import {useState} from 'react'
import {DateRange} from 'react-day-picker'
import {vi} from 'date-fns/locale'
import useContractStore from '../../../../hooks/contract.store'
import useUserLoginInfoStore from '../../../../hooks/user-login-info.store'
import callApi from '../../../../utils/api'
import useCarContractStore from '../../../../hooks/car-contract.store'
import {useLocation, useNavigate} from 'react-router-dom'

interface PostDetailCostProps {
  carRentalPost: CarRentalPost | undefined
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

function PostDetailCost({carRentalPost, setIsLoaded}: PostDetailCostProps) {
  const {isOpen: isOpenDate, onOpen: onOpenDate, onClose: onCloseDate} = useDisclosure()
  const [range, setRange] = useState<DateRange | undefined>()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  console.log(carRentalPost)

  const myCarContract = useContractStore(state => state.mycarContract)
  const address = useContractStore(state => state.address)
  const userInfo = useUserLoginInfoStore(state => state.userInfo)
  const addCarContract = useCarContractStore(state => state.addCarContract)

  async function handleOnRentButtonClick() {
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

    if (!(carRentalPost && userInfo && myCarContract && range?.from && range?.to)) return

    setIsLoaded(true)

    try {
      const {data: carContract} = await callApi<CarContract>(`/api/v1/car-contracts`, 'POST', {
        renter_id: userInfo?.id,
        owner_id: carRentalPost?.owner_id,
        post_id: carRentalPost?.id,
        start_date_ts: range?.from.getTime(),
        end_date_ts: range?.to.getTime()
      })

      addCarContract(carContract)

      const txHash = await myCarContract.pay({
        contract_id: carContract.id,
        amount:
          carRentalPost.mortgage +
          carRentalPost?.price_per_day * differenceInDays(range?.to, range?.from),
        email: userInfo.email
      })

      await callApi(`/api/v1/car-contracts/${carContract.id}/payment/confirm`, 'POST', {
        tx_hash: txHash
      })

      if (location.pathname === `/post/${carRentalPost.id}`) {
        navigate(`/mytrips/${carContract.id}`)
      }
    } catch (error) {
      setIsLoaded(false)
      toast({
        title: 'Đã xảy ra lỗi khi tạo hợp đồng thuê xe. Vui lòng thử lại sau.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        colorScheme: 'common.error',
        isClosable: true
      })
      console.log(error)
    }
  }

  return (
    <VStack mt="20px" alignSelf="flex-start" flex="2" justifyContent="flex-start">
      <VStack
        borderRadius="10px"
        p="20px"
        w="100%"
        bg="white"
        alignItems="flex-start"
        justifyContent="flex-start"
        gap="20px"
      >
        <Text fontSize="32px" fontWeight="bold">
          {carRentalPost?.price_per_day}ETH /ngày
        </Text>
        <HStack
          as="button"
          w="100%"
          p="10px"
          border="1px"
          borderColor="gray.300"
          borderRadius="10px"
          gap="0px"
          onClick={onOpenDate}
        >
          <VStack alignItems="flex-start" flex="1">
            <Text fontSize="12px" color="text.gray">
              Ngày thuê
            </Text>
            <HStack>
              {range?.from ? (
                <Text>{format(range?.from, 'P', {locale: vi})}</Text>
              ) : (
                <Text>Chọn ngày</Text>
              )}

              {/* <Text color="text.gray">- 10:00</Text> */}
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" flex="1">
            <Text fontSize="12px" color="text.gray">
              Ngày trả
            </Text>
            <HStack>
              {range?.to ? (
                <Text>{format(range?.to, 'P', {locale: vi})}</Text>
              ) : (
                <Text>Chọn ngày</Text>
              )}
              {/* <Text color="text.gray">- 10:00</Text> */}
            </HStack>
          </VStack>
        </HStack>
        <VStack
          w="100%"
          p="10px"
          border="1px"
          borderColor="gray.300"
          borderRadius="10px"
          gap="10px"
          alignItems="flex-start"
        >
          <Text fontSize="12px" color="text.gray">
            Địa điểm giao nhận xe
          </Text>
          <Text>
            {carRentalPost?.carRentalPostAddress.prefecture_name &&
            carRentalPost?.carRentalPostAddress.district_name
              ? `${carRentalPost?.carRentalPostAddress.district_name}, ${carRentalPost?.carRentalPostAddress.prefecture_name}`
              : 'Chọn địa điểm'}
          </Text>
        </VStack>
        <Divider w="100%" />
        <VStack w="100%">
          <HStack w="100%">
            <Text color="text.gray">Đơn giá thuê (1 ngày):</Text>
            <Spacer />
            <Text fontWeight="500">{carRentalPost?.price_per_day}ETH</Text>
          </HStack>
          <HStack w="100%">
            <Text color="text.gray">Thế chấp:</Text>
            <Spacer />
            <Text fontWeight="500">0.1ETH</Text>
          </HStack>
        </VStack>
        <Divider w="100%" />
        <VStack w="100%">
          <HStack w="100%">
            <Text color="text.gray">Tổng cộng:</Text>
            <Spacer />
            {carRentalPost?.price_per_day && range?.from && range.to && (
              <Text fontWeight="500">
                0.1ETH + {carRentalPost?.price_per_day}ETH x{' '}
                {differenceInDays(
                  range?.to ?? add(new Date(), {days: 1}),
                  range?.from ?? new Date()
                )}{' '}
                ngày
              </Text>
            )}
          </HStack>
        </VStack>
        <Divider w="100%" />
        <VStack w="100%">
          <HStack w="100%">
            <Text fontWeight="500">Thành tiền:</Text>
            <Spacer />
            {carRentalPost?.price_per_day && range?.from && range.to && (
              <Text fontWeight="500">
                {0.1 +
                  carRentalPost?.price_per_day *
                    (range?.from && range.to
                      ? differenceInDays(
                          range?.to ?? add(new Date(), {days: 1}),
                          range?.from ?? new Date()
                        )
                      : 0)}
                ETH
              </Text>
            )}
          </HStack>
        </VStack>
        <Button
          h="60px"
          w="100%"
          pointerEvents={range?.from && range?.to ? 'auto' : 'none'}
          bg={range?.from && range?.to ? 'primary.500' : 'text.gray'}
          onClick={handleOnRentButtonClick}
        >
          {/* {!isWaitingWallet && <Text>CHỌN THUÊ</Text>}
          {isWaitingWallet && <Spinner thickness="3px" color="white" speed="1s" />} */}
          <Text>CHỌN THUÊ</Text>
        </Button>
      </VStack>
      <DateSelectModal
        isOpen={isOpenDate}
        onClose={onCloseDate}
        range={range}
        setRange={setRange}
        disabledDays={carRentalPost?.carContracts.map(contract => ({
          from: new Date(contract.start_date),
          to: new Date(contract.end_date)
        }))}
      />
    </VStack>
  )
}

export default PostDetailCost
