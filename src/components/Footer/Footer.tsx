import {Heading, HStack, Text, VStack} from '@chakra-ui/react'

function Footer() {
  return (
    <HStack pb="40px" pt="40px" w="calc(100vw - 10px)" bg="background" alignItems="flex-start">
      <VStack flex="3">
        <Heading>MyCar</Heading>
      </VStack>
      <VStack flex="2" alignItems="flex-start">
        <Text fontWeight="500">Chính sách</Text>
        <VStack alignItems="flex-start">
          <Text color="text.gray">Chính sách bảo mật</Text>
          <Text color="text.gray">Điều khoản sử dụng</Text>
          <Text color="text.gray">Chính sách hoàn tiền</Text>
          <Text color="text.gray">Chính sách bảo mật</Text>
          <Text color="text.gray">Giải quyết tranh chấp</Text>
        </VStack>
      </VStack>
      <VStack flex="2" alignItems="flex-start">
        <Text fontWeight="500">Tìm Hiểu Thêm</Text>
        <VStack alignItems="flex-start">
          <Text color="text.gray">Hướng dẫn chung</Text>
          <Text color="text.gray">Hướng dẫn đặt xe</Text>
          <Text color="text.gray">Hướng dẫn thanh toán</Text>
          <Text color="text.gray">Hỏi và trả lời</Text>
        </VStack>
      </VStack>
      <VStack flex="2" alignItems="flex-start">
        <Text fontWeight="500">Chúng tôi</Text>
        <VStack alignItems="flex-start">
          <Text color="text.gray">Về MyCar</Text>
          <Text color="text.gray">MyCar Blog</Text>
          <Text color="text.gray">Tuyển dụng</Text>
        </VStack>
      </VStack>
    </HStack>
  )
}

export default Footer
