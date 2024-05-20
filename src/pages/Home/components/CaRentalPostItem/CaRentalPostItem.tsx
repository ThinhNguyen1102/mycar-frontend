import {Box, Divider, HStack, Icon, Text, VStack} from '@chakra-ui/react'
import {TbManualGearbox} from 'react-icons/tb'
import {PiArmchair} from 'react-icons/pi'
import {BsFuelPump} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'
import {BsLuggage} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'
import {CarRentalPost} from '../../../../types/api-response.type'
import {MdOutlineElectricCar} from 'react-icons/md'
import {BsFuelPumpDiesel} from 'react-icons/bs'

interface CarRentalPostItemProps {
  carRentalPost: CarRentalPost
}

function CarRentalPostItem({carRentalPost}: CarRentalPostItemProps) {
  const navigate = useNavigate()
  return (
    <VStack
      as="button"
      alignItems="flex-start"
      w="100%"
      p="20px"
      bg="white"
      borderRadius="10px"
      gap="20px"
      _hover={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}}
      onClick={() => {
        navigate(`/post/${carRentalPost.id}`)
      }}
    >
      <Box borderRadius="10px" overflow="hidden">
        <img src={carRentalPost?.carImages[0]} alt="car" />
      </Box>
      <VStack alignItems="flex-start" gap="0">
        <Text p="10px 0" fontSize="18px" fontWeight="500" lineHeight="1">
          {carRentalPost?.model}
        </Text>
        <HStack>
          <Box pt="5px">
            <Icon as={TbManualGearbox} />
          </Box>
          <Text color="text.gray" fontSize="13px">
            {carRentalPost?.transmission === 'auto' ? 'Số tự động' : 'Số sàn'}
          </Text>
        </HStack>
        <HStack gap="10px">
          <HStack pt="5px">
            <Icon as={PiArmchair} />
            <Text color="text.gray" display="inline">
              {carRentalPost?.seats}
            </Text>
          </HStack>
          <Box pt="8px">
            {carRentalPost?.fuel === 'electric' && <Icon as={MdOutlineElectricCar} />}
            {carRentalPost?.fuel === 'gasoline' && <Icon as={BsFuelPump} />}
            {carRentalPost?.fuel === 'diesel' && <Icon as={BsFuelPumpDiesel} />}
          </Box>
        </HStack>
        <HStack>
          <Box pt="5px">
            <Icon as={IoLocationOutline} />
          </Box>
          <Text fontSize="13px" color="text.gray" display="inline">
            {carRentalPost?.carRentalPostAddress.district_name +
              ', ' +
              carRentalPost?.carRentalPostAddress.prefecture_name}
          </Text>
        </HStack>
      </VStack>
      <Divider w="100%" />
      <HStack w="100%" justify="space-between">
        <HStack gap="15px">
          <HStack>
            <Icon as={FaRegStar} />
            <Text color="text.gray" display="inline">
              4
            </Text>
          </HStack>
          <HStack>
            <Icon as={BsLuggage} />
            <Text color="text.gray" display="inline">
              4 chuyến
            </Text>
          </HStack>
        </HStack>
        <HStack>
          <Text fontSize="20px" fontWeight="500">
            {carRentalPost?.price_per_day + 'ETH'}
          </Text>
          <Text fontSize="14px" color="text.gray">
            /ngày
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}

export default CarRentalPostItem
