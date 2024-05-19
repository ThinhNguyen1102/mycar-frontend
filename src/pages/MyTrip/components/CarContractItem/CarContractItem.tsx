import {Box, HStack, Icon, Spacer, SystemStyleObject, Tag, Text, VStack} from '@chakra-ui/react'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {format} from 'date-fns'
import {CarContractStatus} from '../../../../enums/common.enum'
import {useNavigate} from 'react-router-dom'
import {MdDateRange} from 'react-icons/md'
import {IoLocationOutline} from 'react-icons/io5'

interface CarContractItemProps {
  carContract: CarContract
  carRentalPost: CarRentalPost | null
}

function CarContractItem({carContract, carRentalPost}: CarContractItemProps) {
  const navigate = useNavigate()

  return (
    <HStack
      borderRadius="10px"
      h="150px"
      border="1px"
      borderColor="gray.300"
      w="100%"
      p="15px"
      _hover={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
        bg: 'background',
        cursor: 'pointer'
      }}
      onClick={() => {
        navigate(`/mytrips/${carContract.id}`, {
          state: {contract: carContract, carRentalPost}
        })
      }}
    >
      <Box h="120px" w="160px" borderRadius="10px" overflow="hidden">
        <img src={carRentalPost?.carImages[0]} alt="car" />
      </Box>
      <VStack gap="0" alignItems="flex-start" height="100%">
        <Text fontWeight="500">
          {carRentalPost?.brand + ' - ' + carRentalPost?.model} (MHĐ:{' '}
          {carContract.id.toString().padStart(6, '0')})
        </Text>
        <Text fontSize="14px" color="text.gray">
          Biển số: {carRentalPost?.license_plate}
        </Text>
        <Text fontSize="14px" color="text.gray">
          Chủ xe: {carContract.owner.username}
        </Text>
        <Spacer />
        <HStack>
          <Icon as={MdDateRange} />
          <Text fontSize="14px" color="text.gray" fontWeight="bold">
            {format(carContract.start_date, 'hh:mm dd/MM/yyyy')} -{' '}
            {format(carContract.end_date, 'hh:mm dd/MM/yyyy')}
          </Text>
        </HStack>
        <HStack>
          <Icon as={IoLocationOutline} />
          <Text fontSize="14px" color="text.gray">
            {carRentalPost?.carRentalPostAddress.district_name},{' '}
            {carRentalPost?.carRentalPostAddress.prefecture_name}
          </Text>
        </HStack>
      </VStack>
      <Spacer />
      {carContract.is_processing && (
        <Text fontSize="14px" fontWeight="500" color="#f59f00">
          Đang xử lý...
        </Text>
      )}
      {!carContract.is_processing && (
        <VStack height="100%" alignItems="flex-end">
          {carContract.contract_status === CarContractStatus.WAITING_APPROVAL && (
            <Tag bg="common.warning" sx={styles.status_tag}>
              Chờ xác nhận
            </Tag>
          )}
          {carContract.contract_status === CarContractStatus.REJECTED && (
            <Tag bg="common.error" sx={styles.status_tag}>
              Đã từ chối
            </Tag>
          )}
          {carContract.contract_status === CarContractStatus.APPROVED && (
            <Tag bg="common.info" sx={styles.status_tag}>
              Đã xác nhận
            </Tag>
          )}
          {carContract.contract_status === CarContractStatus.ENDED && (
            <Tag bg="common.success" sx={styles.status_tag}>
              Đã kết thúc
            </Tag>
          )}
          {carContract.contract_status === CarContractStatus.STARTED && (
            <Tag bg="common.info" sx={styles.status_tag}>
              Đã bắt đầu
            </Tag>
          )}
          {carContract.contract_status === CarContractStatus.CANCELED && (
            <Tag bg="common.error" sx={styles.status_tag}>
              Đã hủy
            </Tag>
          )}
          <Spacer />
          <Text fontWeight="500" fontSize="20px" color="text.dark">
            {carContract.price_per_day} ETH/ngày
          </Text>
        </VStack>
      )}
    </HStack>
  )
}

type Styles = {
  status_tag: SystemStyleObject
}

const styles: Styles = {
  status_tag: {
    color: 'white',
    minW: '100px',
    fontSize: '12px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default CarContractItem
