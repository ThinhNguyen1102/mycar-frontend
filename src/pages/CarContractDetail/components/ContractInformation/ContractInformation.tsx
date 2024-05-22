import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Spacer,
  Spinner,
  SystemStyleObject,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {format} from 'date-fns'
import {IconType} from 'react-icons'
import {FaCar} from 'react-icons/fa'
import {FaUser} from 'react-icons/fa'
import {BsFillLuggageFill} from 'react-icons/bs'
import {FaEthereum} from 'react-icons/fa'
import {useState} from 'react'
import {IoIosCheckmarkCircleOutline} from 'react-icons/io'
import useContractStore from '../../../../hooks/contract.store'
import {CarContractSM} from '../../../../types/contract.type'
import {CarContractStatus} from '../../../../enums/common.enum'

interface ContractInformationProps {
  carRentalPost: CarRentalPost
  contract: CarContract
}

// {
//   contract_id: 53,
//   owner_address: "thinhhh@gmail.com",
//   owner_email: "0xeDD2B69057bf023A26E5FbFb6D0848C3b2df2924",
//   renter_address: "kiyotaka@gmail.com",
//   renter_email: "0x1bF91a5cD9c926d7d74f69ef6552d73cFE90dd48",
//   rental_price_per_day: 0.28,
//   mortgage: 0.1,
//   over_limit_fee: 0.04,
//   over_time_fee: 0.03,
//   cleaning_fee: 0.025,
//   deodorization_fee: 0.045,
//   num_of_days: 1,
//   start_date: "2024-05-08T17:00:00.000Z",
//   end_date: "2024-05-09T17:00:00.000Z",
//   car_model: "Nissan Altima",
//   car_plate: "DEF789",
//   status: 3,
//   created_at: "+056299-05-26T03:20:00.000Z"
// }

// {
//   id: number
//   owner_wallet_address: string
//   owner: UserInfo
//   renter_wallet_address: string
//   renter: UserInfo
//   price_per_day: number
//   mortgage: number
//   over_limit_fee: number
//   over_time_fee: number
//   cleaning_fee: number
//   deodorization_fee: number
//   num_of_days: number
//   start_date: Date
//   end_date: Date
//   contract_status: CarContractStatus

//   post_id: number
//   contractFulfillment: ContractFulfillment | null
//   contractTxHistories: ContractTxHistory[]
//   car_info_snapshot: string
//   is_processing: boolean
//   created_at: Date
//   updated_at: Date
//   reviews: any[]
// }

function ContractInformation({carRentalPost, contract}: ContractInformationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const toast = useToast()

  const myCarContract = useContractStore(state => state.mycarContract)
  const address = useContractStore(state => state.address)

  const verifyContractInfo = async () => {
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
    setIsVerifying(true)

    try {
      const res = await myCarContract?.getCarContractWithId(contract.id)
      setIsVerifying(false)

      if (res) setIsVerified(vefifyContract(contract, res[0]))
      else setIsVerified(false)
    } catch (error) {
      console.log(error)
      setIsVerifying(false)
      setIsVerified(false)
    }
  }

  const vefifyContract = (contract: CarContract, contractSM: CarContractSM): boolean => {
    return (
      contract.owner.email === contractSM.owner_email &&
      contract.owner_wallet_address === contractSM.owner_address &&
      contract.renter.email === contractSM.renter_email &&
      contract.renter_wallet_address === contractSM.renter_address &&
      contract.price_per_day === contractSM.rental_price_per_day &&
      contract.mortgage === contractSM.mortgage &&
      contract.over_limit_fee === contractSM.over_limit_fee &&
      contract.over_time_fee === contractSM.over_time_fee &&
      contract.cleaning_fee === contractSM.cleaning_fee &&
      contract.deodorization_fee === contractSM.deodorization_fee &&
      contract.num_of_days === contractSM.num_of_days

      // contract.contract_status === contractSM.status &&
      // contract.start_date === contractSM.start_date &&
      // contract.end_date === contractSM.end_date &&
      // contract.car_model === contractSM.car_model &&
      // contract.car_plate === contractSM.car_plate
    )
  }

  return (
    <VStack
      p="20px"
      borderRadius="10px"
      bg="white"
      alignSelf="flex-start"
      alignItems="flex-start"
      flex="3"
    >
      <HStack w="100%">
        <Box bg="primary.500" p="0 10px" borderRadius="5px">
          <Text fontSize="18px" fontWeight="500" color="white">
            THÔNG TIN HỢP ĐỒNG THUÊ XE
          </Text>
        </Box>
        <Spacer />
        {!isVerified && contract.contract_status !== CarContractStatus.WAITING_APPROVAL && (
          <Button
            p="0px 10px"
            minW="80px"
            maxH="27px"
            bg="common.info"
            onClick={verifyContractInfo}
          >
            {!isVerifying && (
              <Text fontSize="12px" fontWeight="500" color="white">
                XÁC MINH
              </Text>
            )}
            {isVerifying && <Spinner size="sm" color="white" />}
          </Button>
        )}
        {isVerified && contract.contract_status !== CarContractStatus.WAITING_APPROVAL && (
          <HStack>
            <Text fontSize="12px" fontWeight="500" color="common.success">
              ĐÃ XÁC MINH
            </Text>
            <Icon as={IoIosCheckmarkCircleOutline} color="common.success" />
          </HStack>
        )}
      </HStack>
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
          <Text sx={styles.content}>
            Địa chỉ ví:{' '}
            {contract.renter_wallet_address && (
              <Box as="span" fontWeight="500">
                {contract.renter_wallet_address.slice(0, 6)}...
                {contract.renter_wallet_address.slice(-4)}
              </Box>
            )}
            {!contract.renter_wallet_address && 'Chưa xác định'}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" gap="0" flex="1">
          <SubTitle title="Thông tin chủ xe:" icon={FaUser} />
          <Text sx={styles.content}>{contract?.owner.username}</Text>
          <Text sx={styles.content}>
            E-mail:{' '}
            <Box as="span" fontWeight="500">
              {contract?.owner.email}
            </Box>
          </Text>
          <Text sx={styles.content}>
            Điện thoại:{' '}
            <Box as="span" fontWeight="500">
              {contract?.owner.phone_number}
            </Box>
          </Text>
          <Text sx={styles.content}>
            Địa chỉ ví:{' '}
            {contract.owner_wallet_address && (
              <Box as="span" fontWeight="500">
                {contract.owner_wallet_address.slice(0, 6)}...
                {contract.owner_wallet_address.slice(-4)}
              </Box>
            )}
            {!contract.owner_wallet_address && 'Chưa xác định'}
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
