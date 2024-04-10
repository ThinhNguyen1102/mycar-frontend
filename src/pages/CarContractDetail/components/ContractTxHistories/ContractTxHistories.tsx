import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/react'
import {CarContract} from '../../../../types/api-response.type'

interface ContractTxHistoriesProps {
  contract: CarContract
}

function ContractTxHistories({contract}: ContractTxHistoriesProps) {
  return (
    <VStack
      bg="white"
      flex="2"
      alignSelf="flex-start"
      alignItems="flex-start"
      justifyContent="flex-start"
      h="100%"
      p="20px"
      borderRadius="10px"
    >
      <Text fontSize="18px" fontWeight="500">
        LỊCH SỬ GIAO DỊCH
      </Text>
      <Accordion allowMultiple w="100%" h="100%">
        {contract?.contractTxHistories.map(tx => {
          return (
            <AccordionItem key={tx.tx_hash} borderColor="white">
              <h2>
                <AccordionButton pl="0">
                  <Box as="span" flex="1" textAlign="left">
                    Nguyễn Văn A đã thanh toán 0.2 ETH
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} pt="0">
                <VStack gap="0" alignItems="flex-start">
                  <Text fontSize="12px" color="text.gray">
                    Thời gian: 10:00 - 20/10/2021
                  </Text>
                  <Text fontSize="12px" color="text.gray">
                    Nội dung: Thanh toán tiền thuê xe
                  </Text>
                  <Text fontSize="12px" color="text.gray">
                    Số tiền: 0.2 ETH
                  </Text>
                  <HStack>
                    <Text fontSize="12px" color="text.gray">
                      Trạng thái:{' '}
                    </Text>
                    <Text fontSize="12px" color="#4cd137">
                      Đã hoàn thành
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="12px" color="text.gray">
                      Xem giao dịch trên etherscan:
                    </Text>
                    <Link
                      fontSize="12px"
                      color="#0fbcf9"
                      target="_blank"
                      href="https://sepolia.etherscan.io/tx/0xd0821811442bb47fcadb238bd0bfdb947387f53a00155897ecfebd78dd6a56ba"
                    >
                      open
                    </Link>
                  </HStack>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </VStack>
  )
}

export default ContractTxHistories
