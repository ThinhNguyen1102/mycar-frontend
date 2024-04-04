import {Button, Divider, HStack, Spacer, Text, VStack} from '@chakra-ui/react'

function PostDetailCost() {
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
          0.05ETH /ngày
        </Text>
        <HStack w="100%" p="10px" border="1px" borderColor="gray.300" borderRadius="10px" gap="0px">
          <VStack alignItems="flex-start" flex="1">
            <Text fontSize="12px" color="text.gray">
              Ngày thuê
            </Text>
            <HStack>
              <Text>20/10/2021</Text>
              <Text color="text.gray">- 10:00</Text>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" flex="1">
            <Text fontSize="12px" color="text.gray">
              Ngày trả
            </Text>
            <HStack>
              <Text>21/10/2021</Text>
              <Text color="text.gray">- 10:00</Text>
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
          <Text>Cầu Giấy, Hà Nội</Text>
        </VStack>
        <Divider w="100%" />
        <VStack w="100%">
          <HStack w="100%">
            <Text color="text.gray">Đơn giá thuê (1 ngày):</Text>
            <Spacer />
            <Text fontWeight="500">0.05ETH</Text>
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
            <Text fontWeight="500">0.1ETH + 0.05ETH x 1 ngày</Text>
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
    </VStack>
  )
}

export default PostDetailCost
