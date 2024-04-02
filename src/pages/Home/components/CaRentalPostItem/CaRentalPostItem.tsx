import {Box, Divider, HStack, Icon, Text, VStack} from '@chakra-ui/react'
import {TbManualGearbox} from 'react-icons/tb'
import {PiArmchair} from 'react-icons/pi'
import {BsFuelPump} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'
import {BsLuggage} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
// import {MdOutlineElectricCar} from 'react-icons/md'
// import {BsFuelPumpDiesel} from 'react-icons/bs'

function CarRentalPostItem() {
  return (
    <VStack
      as="button"
      alignItems="flex-start"
      w="100%"
      p="20px"
      bg="white"
      borderRadius="10px"
      gap="20px"
      _hover={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}
    >
      <Box borderRadius="10px" overflow="hidden">
        <img
          src="https://fastly.picsum.photos/id/661/4000/3000.jpg?hmac=WokO6IXmoR3EcbrvUN5ugRK95zwbbwjrUtAZZMEuVO0"
          alt="car"
        />
      </Box>
      <VStack alignItems="flex-start" gap="0">
        <Text p="10px 0" fontSize="20px" fontWeight="500" lineHeight="1">
          Toyota Yaris
        </Text>
        <HStack>
          <Box pt="5px">
            <Icon as={TbManualGearbox} />
          </Box>
          <Text color="text.gray">Số tự động</Text>
        </HStack>
        <HStack gap="10px">
          <HStack pt="5px">
            <Icon as={PiArmchair} />
            <Text color="text.gray" display="inline">
              4
            </Text>
          </HStack>
          <Box pt="8px">
            <Icon as={BsFuelPump} />
          </Box>
        </HStack>
        <HStack>
          <Box pt="5px">
            <Icon as={IoLocationOutline} />
          </Box>
          <Text color="text.gray" display="inline">
            Cầu Giấy, Hà Nội
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
            0.05 ETH
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
