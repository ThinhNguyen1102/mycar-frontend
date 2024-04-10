import {Divider, HStack, Text, VStack} from '@chakra-ui/react'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {format} from 'date-fns'

interface ContractInformationProps {
  carRentalPost: CarRentalPost
  contract: CarContract
}

function ContractInformation({carRentalPost, contract}: ContractInformationProps) {
  return (
    <VStack
      p="20px"
      borderRadius="10px"
      bg="white"
      alignSelf="flex-start"
      alignItems="flex-start"
      flex="3"
    >
      <Text fontSize="18px" fontWeight="500">
        THÔNG TIN HỢP ĐỒNG THUÊ XE
      </Text>
      <VStack alignItems="flex-start" gap="0">
        <Text fontWeight="500">Thông tin xe:</Text>
        <Text color="text.gray">{carRentalPost?.brand + ' - ' + carRentalPost?.model}</Text>
        <Text color="text.gray">{carRentalPost?.license_plate}</Text>
      </VStack>
      <Divider />
      <HStack w="100%">
        <VStack alignItems="flex-start" gap="0" flex="1">
          <Text fontWeight="500">Thông tin người thuê:</Text>
          <Text color="text.gray">{contract?.owner.username}</Text>
          <Text color="text.gray">{contract?.owner.phone_number}</Text>
        </VStack>
        <VStack alignItems="flex-start" gap="0" flex="1">
          <Text fontWeight="500">Thông tin chủ xe:</Text>
          <Text color="text.gray">{contract?.renter.username}</Text>
          <Text color="text.gray">{contract?.renter.phone_number}</Text>
        </VStack>
      </HStack>
      <Divider />
      <VStack alignItems="flex-start" gap="0">
        <Text fontWeight="500">Thông tin chuyến đi:</Text>
        <Text color="text.gray">
          {format(contract?.start_date, 'hh:mm dd/MM/yyyy')} -{' '}
          {format(contract?.end_date, 'hh:mm dd/MM/yyyy')}
        </Text>
        <Text color="text.gray">
          {carRentalPost?.carRentalPostAddress.district_name},{' '}
          {carRentalPost?.carRentalPostAddress.prefecture_name}
        </Text>
      </VStack>
      <Divider />
      <HStack w="100%" alignItems="flex-start">
        <VStack alignItems="flex-start" gap="0" flex="1">
          <Text fontWeight="500">Thông tin đơn giá:</Text>
          <Text color="text.gray">Phí thuê 1 ngày: {contract?.price_per_day} ETH/ngày</Text>
          <Text color="text.gray">Thế chấp: {contract?.mortgage} ETH (mặc định)</Text>
          <Text color="text.gray">Số lượng ngày: {contract?.num_of_days} ngày</Text>
          <Text color="text.gray">
            Tổng đơn giá: {contract?.price_per_day * contract?.num_of_days + contract?.mortgage} ETH
          </Text>
        </VStack>
        <VStack alignItems="flex-start" gap="0" flex="1">
          <Text color="text.gray" fontSize="12px" fontWeight="500">
            Phụ phí:
          </Text>
          <Text fontSize="12px" color="text.gray">
            Phí quá giờ (1 giờ): {contract?.over_time_fee} ETH
          </Text>
          <Text fontSize="12px" color="text.gray">
            Phí quá giới hạn (1 km): {contract?.over_limit_fee} ETH
          </Text>
          <Text fontSize="12px" color="text.gray">
            Phí vệ sinh: {contract?.cleaning_fee} ETH
          </Text>
          <Text fontSize="12px" color="text.gray">
            Phí vệ khử mùi: {contract?.deodorization_fee} ETH
          </Text>
        </VStack>
      </HStack>
      <Divider />
    </VStack>
  )
}

export default ContractInformation
