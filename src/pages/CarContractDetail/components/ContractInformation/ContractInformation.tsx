import {Box, Divider, HStack, Icon, SystemStyleObject, Text, VStack} from '@chakra-ui/react'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {format} from 'date-fns'
import {IconType} from 'react-icons'
import {FaCar} from 'react-icons/fa'
import {FaUser} from 'react-icons/fa'
import {BsFillLuggageFill} from 'react-icons/bs'
import {FaEthereum} from 'react-icons/fa'

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
      <Box bg="primary.500" w="100%" p="0 10px" borderRadius="5px">
        <Text fontSize="18px" fontWeight="500" color="white">
          THÔNG TIN HỢP ĐỒNG THUÊ XE
        </Text>
      </Box>
      <Divider />
      <VStack alignItems="flex-start" gap="0">
        <SubTitle title="Thông tin xe:" icon={FaCar} />
        <Text sx={styles.content}>{carRentalPost?.brand + ' - ' + carRentalPost?.model}</Text>
        <Text sx={styles.content}>{carRentalPost?.license_plate}</Text>
      </VStack>
      <Divider />
      <HStack w="100%">
        <VStack alignItems="flex-start" gap="0" flex="1">
          <SubTitle title="Thông tin người thuê:" icon={FaUser} />
          <Text sx={styles.content}>{contract?.owner.username}</Text>
          <Text sx={styles.content}>
            E-mail:{' '}
            <Box as="span" fontWeight="500">
              {contract?.renter.email}
            </Box>
          </Text>
          <Text sx={styles.content}>
            Điện thoại:{' '}
            <Box as="span" fontWeight="500">
              {contract?.renter.phone_number}
            </Box>
          </Text>
        </VStack>
        <VStack alignItems="flex-start" gap="0" flex="1">
          <SubTitle title="Thông tin chủ xe:" icon={FaUser} />
          <Text sx={styles.content}>{contract?.renter.username}</Text>
          <Text sx={styles.content}>
            E-mail:{' '}
            <Box as="span" fontWeight="500">
              {contract?.renter.email}
            </Box>
          </Text>
          <Text sx={styles.content}>
            Điện thoại:{' '}
            <Box as="span" fontWeight="500">
              {contract?.renter.phone_number}
            </Box>
          </Text>
        </VStack>
      </HStack>
      <Divider />
      <VStack alignItems="flex-start" gap="0">
        <SubTitle title="Thông tin chuyến đi:" icon={BsFillLuggageFill} />
        <Text sx={styles.content}>
          {format(contract?.start_date, 'hh:mm dd/MM/yyyy')} -{' '}
          {format(contract?.end_date, 'hh:mm dd/MM/yyyy')}
        </Text>
        <Text sx={styles.content}>
          {carRentalPost?.carRentalPostAddress.district_name},{' '}
          {carRentalPost?.carRentalPostAddress.prefecture_name}
        </Text>
      </VStack>
      <Divider />
      <HStack w="100%" alignItems="flex-start">
        <VStack alignItems="flex-start" gap="0" flex="1">
          <SubTitle title="Thông tin đơn giá:" icon={FaEthereum} />
          <Text sx={styles.content}>
            Phí thuê 1 ngày:{' '}
            <Box as="span" fontWeight="500">
              {contract?.price_per_day}
            </Box>{' '}
            ETH/ngày
          </Text>
          <Text sx={styles.content}>
            Thế chấp:{' '}
            <Box as="span" fontWeight="500">
              {contract?.mortgage}
            </Box>{' '}
            ETH (mặc định)
          </Text>
          <Text sx={styles.content}>
            Số lượng ngày:{' '}
            <Box as="span" fontWeight="500">
              {contract?.num_of_days}
            </Box>{' '}
            ngày
          </Text>
          <Text sx={styles.content}>
            Tổng đơn giá:{' '}
            <Box as="span" fontWeight="500">
              {contract?.price_per_day * contract?.num_of_days + contract?.mortgage}
            </Box>{' '}
            ETH
          </Text>
        </VStack>
        <VStack alignItems="flex-start" gap="0" flex="1">
          <SubTitle title="Phụ phí:" icon={FaEthereum} />
          <Text sx={styles.content}>
            Phí quá giờ (1 giờ):{' '}
            <Box as="span" fontWeight="500">
              {contract?.over_limit_fee}
            </Box>{' '}
            ETH
          </Text>
          <Text sx={styles.content}>
            Phí quá giới hạn (1 km):{' '}
            <Box as="span" fontWeight="500">
              {contract?.over_time_fee}
            </Box>{' '}
            ETH
          </Text>
          <Text sx={styles.content}>
            Phí vệ sinh:{' '}
            <Box as="span" fontWeight="500">
              {contract?.cleaning_fee}
            </Box>{' '}
            ETH
          </Text>
          <Text sx={styles.content}>
            Phí vệ khử mùi:{' '}
            <Box as="span" fontWeight="500">
              {contract?.deodorization_fee}
            </Box>{' '}
            ETH
          </Text>
        </VStack>
      </HStack>
      <Divider />
    </VStack>
  )
}

function SubTitle({title, icon}: {title: string; icon: IconType}) {
  return (
    <HStack>
      <Icon as={icon} />
      <Text sx={styles.title}>{title}</Text>
    </HStack>
  )
}

type Styles = {
  title: SystemStyleObject
  content: SystemStyleObject
}

const styles: Styles = {
  title: {
    fontWeight: '500',
    fontSize: '18px'
  },
  content: {
    color: 'text.gray'
  }
}

export default ContractInformation
