import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/react'
import {CarContract} from '../../../../types/api-response.type'
import {formatTxInfo} from '../../../../utils/helpers'
import {format} from 'date-fns'
import {ContractTransactionType} from '../../../../enums/common.enum'

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
      <Box w="100%" bg="primary.500" p="0 10px" borderRadius="5px">
        <Text fontSize="18px" fontWeight="500" color="white">
          LỊCH SỬ GIAO DỊCH
        </Text>
      </Box>
      <Divider />
      <Accordion allowMultiple w="100%" h="100%">
        {contract?.contractTxHistories.map(tx => {
          const txInfo = formatTxInfo(tx, contract)
          return (
            <AccordionItem key={tx.tx_hash} borderColor="white">
              <h2>
                <AccordionButton pl="0" _hover={{bg: 'transparent'}}>
                  <Box as="span" flex="1" textAlign="left" fontWeight="500" color="text.gray">
                    {txInfo.content}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} pt="0">
                <VStack gap="0" alignItems="flex-start">
                  <Text fontSize="12px" color="text.gray">
                    Thời gian: {format(new Date(tx.created_at), 'HH:mm dd/MM/yyyy')}
                  </Text>
                  {txInfo.value > 0 && (
                    <Text fontSize="12px" color="text.gray">
                      Giá trị: {txInfo.value} ETH
                    </Text>
                  )}
                  {tx.tx_type !== ContractTransactionType.PAYMENT &&
                    tx.tx_type !== ContractTransactionType.CAR_CONTRACT_CREATE && (
                      <Text fontSize="12px" color="text.gray">
                        Chủ xe nhận: {txInfo.owner_receive} ETH
                      </Text>
                    )}
                  {tx.tx_type !== ContractTransactionType.PAYMENT &&
                    tx.tx_type !== ContractTransactionType.CAR_CONTRACT_CREATE && (
                      <Text fontSize="12px" color="text.gray">
                        Người thuê nhận: {txInfo.renter_receive} ETH
                      </Text>
                    )}
                  <HStack>
                    <Text fontSize="12px" color="text.gray">
                      Xem giao dịch trên etherscan:
                    </Text>
                    <Link
                      fontSize="12px"
                      color="#0fbcf9"
                      target="_blank"
                      href={`https://sepolia.etherscan.io/tx/${tx.tx_hash}`}
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
