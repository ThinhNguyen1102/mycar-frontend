import {HStack, Text, VStack} from '@chakra-ui/react'

export default function EndStatus() {
  return (
    <HStack w="100%" justifyContent="space-between">
      <VStack alignItems="flex-start" gap="0">
        <Text fontWeight="500" mb="5px">
          Hợp đồng đã hoàn thành.
        </Text>
      </VStack>
    </HStack>
  )
}
