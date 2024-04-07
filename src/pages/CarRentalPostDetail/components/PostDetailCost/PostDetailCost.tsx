import {Button, Divider, HStack, Spacer, Text, useDisclosure, VStack} from '@chakra-ui/react'
import {CarRentalPost} from '../../../../types/api-response.type'
import {add, differenceInDays, format} from 'date-fns'
import DateSelectModal from '../../../Home/components/DateSelectModal'
import {useState} from 'react'
import {DateRange} from 'react-day-picker'
import {vi} from 'date-fns/locale'
import AddressSelectModel from '../../../Home/components/AddressSelectModal'

interface PostDetailCostProps {
  carRentalPost: CarRentalPost | undefined
}

function PostDetailCost({carRentalPost}: PostDetailCostProps) {
  const {isOpen: isOpenDate, onOpen: onOpenDate, onClose: onCloseDate} = useDisclosure()
  const {isOpen: isOpenAddress, onOpen: onOpenAddress, onClose: onCloseAddress} = useDisclosure()
  const [range, setRange] = useState<DateRange | undefined>()

  console.log(range)

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
              <Text>{format(range?.from ?? new Date(), 'P', {locale: vi})}</Text>
              {/* <Text color="text.gray">- 10:00</Text> */}
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" flex="1">
            <Text fontSize="12px" color="text.gray">
              Ngày trả
            </Text>
            <HStack>
              <Text>{format(range?.to ?? add(new Date(), {days: 1}), 'P', {locale: vi})}</Text>
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
          as="button"
          onClick={onOpenAddress}
        >
          <Text fontSize="12px" color="text.gray">
            Địa điểm giao nhận xe
          </Text>
          <Text>Cầu Giấy, Hà Nội</Text>
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
            <Text fontWeight="500">
              0.1ETH + {carRentalPost?.price_per_day}ETH x{' '}
              {differenceInDays(range?.to ?? add(new Date(), {days: 1}), range?.from ?? new Date())}{' '}
              ngày
            </Text>
          </HStack>
        </VStack>
        <Divider w="100%" />
        <VStack w="100%">
          <HStack w="100%">
            <Text fontWeight="500">Thành tiền:</Text>
            <Spacer />
            <Text fontWeight="500">0.15ETH</Text>
          </HStack>
        </VStack>
        <Button h="60px" w="100%">
          CHỌN THUÊ
        </Button>
      </VStack>
      <DateSelectModal
        isOpen={isOpenDate}
        onClose={onCloseDate}
        range={range}
        setRange={setRange}
      />
      <AddressSelectModel isOpen={isOpenAddress} onClose={onCloseAddress} />
    </VStack>
  )
}

export default PostDetailCost
