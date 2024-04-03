import {Box, HStack, Spacer, Tag, Text, useDisclosure, VStack} from '@chakra-ui/react'
import CarContractDetail from '../CarContractDetail'

function CarContractItem() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <HStack
      borderRadius="10px"
      h="150px"
      border="1px"
      borderColor="gray.300"
      w="100%"
      p="15px"
      _hover={{
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
      }}
      onClick={onOpen}
    >
      <Box h="120px" w="160px" borderRadius="10px" overflow="hidden">
        <img
          src="https://fastly.picsum.photos/id/661/4000/3000.jpg?hmac=WokO6IXmoR3EcbrvUN5ugRK95zwbbwjrUtAZZMEuVO0"
          alt="car"
        />
      </Box>
      <VStack gap="0" alignItems="flex-start" height="100%">
        <Text fontWeight="500">Toyota Yaris</Text>
        <Text fontSize="12px" color="text.gray">
          30Z-123.45
        </Text>
        <Text fontSize="12px" color="text.gray">
          Chủ xe: Nguyễn Văn A
        </Text>
        <Spacer />
        <Text fontSize="12px" color="text.gray">
          10:00 20/10/2021 - 10:00 21/10/2021
        </Text>
        <Text fontSize="12px" color="text.gray">
          Cầu Giấy, Hà Nội
        </Text>
      </VStack>
      <Spacer />
      <VStack height="100%">
        <Tag bg="#f9ca24" color="white">
          Chờ xác nhận
        </Tag>
        <Spacer />
        <Text fontWeight="500" fontSize="20px" color="text.dark">
          0.05 ETH/ngày
        </Text>
      </VStack>
      <CarContractDetail isOpen={isOpen} onClose={onClose} />
    </HStack>
  )
}

export default CarContractItem
