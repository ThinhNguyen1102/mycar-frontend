import {Box, HStack, Icon, Text, VStack} from '@chakra-ui/react'
import {MdKeyboardDoubleArrowRight} from 'react-icons/md'

function ContractStageProcess() {
  return (
    <VStack w="100%" bg="white" borderRadius="10px" p="20px">
      <Text alignSelf="flex-start" fontSize="18px" fontWeight="500">
        TRẠNG THÁI HỢP ĐỒNG
      </Text>
      <HStack w="100%">
        <Box w="100px" as="button" bg="#4cd137" p="10px" borderRadius="5px" pointerEvents="none">
          <Text fontSize="12px" color="white">
            Chờ xác nhận
          </Text>
        </Box>
        <Icon fontSize="32px" as={MdKeyboardDoubleArrowRight} />
        <Box w="100px" as="button" bg="#4cd137" p="10px" borderRadius="5px" pointerEvents="none">
          <Text fontSize="12px" color="white">
            Đã xác nhận
          </Text>
        </Box>
        <Icon fontSize="32px" as={MdKeyboardDoubleArrowRight} />
        <Box w="100px" as="button" bg="gray.300" p="10px" borderRadius="5px" pointerEvents="none">
          <Text fontSize="12px" color="white">
            Bắt đầu
          </Text>
        </Box>
      </HStack>
    </VStack>
  )
}

export default ContractStageProcess
