import {Box, HStack, Spacer, SystemStyleObject, Tag, Text, VStack} from '@chakra-ui/react'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {format} from 'date-fns'
import {CarContractStatus} from '../../../../enums/common.enum'
import {useNavigate} from 'react-router-dom'

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
        <img
          src="https://fastly.picsum.photos/id/661/4000/3000.jpg?hmac=WokO6IXmoR3EcbrvUN5ugRK95zwbbwjrUtAZZMEuVO0"
          alt="car"
        />
      </Box>
      <VStack gap="0" alignItems="flex-start" height="100%">
        <Text fontWeight="500">{carRentalPost?.brand + ' - ' + carRentalPost?.model}</Text>
        <Text fontSize="12px" color="text.gray">
          {carRentalPost?.license_plate}
        </Text>
        <Text fontSize="12px" color="text.gray">
          Chủ xe: {carContract.owner.username}
        </Text>
        <Spacer />
        <Text fontSize="12px" color="text.gray">
          {format(carContract.start_date, 'hh:mm dd/MM/yyyy')} -{' '}
          {format(carContract.end_date, 'hh:mm dd/MM/yyyy')}
        </Text>
        <Text fontSize="12px" color="text.gray">
          {carRentalPost?.carRentalPostAddress.district_name},{' '}
          {carRentalPost?.carRentalPostAddress.prefecture_name}
        </Text>
      </VStack>
      <Spacer />
      <VStack height="100%" alignItems="flex-end">
        {carContract.contract_status === CarContractStatus.WAITING_APPROVAL && (
          <Tag bg="#ffd43b" sx={styles.status_tag}>
            Chờ xác nhận
          </Tag>
        )}
        {carContract.contract_status === CarContractStatus.REJECTED && (
          <Tag bg="#f03e3e" sx={styles.status_tag}>
            Đã từ chối
          </Tag>
        )}
        {carContract.contract_status === CarContractStatus.APPROVED && (
          <Tag bg="#228be6" sx={styles.status_tag}>
            Đã xác nhận
          </Tag>
        )}
        {carContract.contract_status === CarContractStatus.ENDED && (
          <Tag bg="#40c057" sx={styles.status_tag}>
            Đã kết thúc
          </Tag>
        )}
        {carContract.contract_status === CarContractStatus.CANCELED && (
          <Tag bg="#f03e3e" sx={styles.status_tag}>
            Đã hủy
          </Tag>
        )}
        <Spacer />
        <Text fontWeight="500" fontSize="20px" color="text.dark">
          {carContract.price_per_day} ETH/ngày
        </Text>
      </VStack>
      {/* <CarContractDetail
        isOpen={isOpen}
        onClose={onClose}
        carContract={carContract}
        carRentalPost={carRentalPost}
      /> */}
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
