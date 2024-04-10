import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Icon,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'
import {MdKeyboardDoubleArrowRight} from 'react-icons/md'
import {CarContract, CarRentalPost} from '../../../../types/api-response.type'
import {format} from 'date-fns'

interface CarContractDetailProps {
  isOpen: boolean
  onClose: () => void
  carContract: CarContract
  carRentalPost: CarRentalPost | null
}

function CarContractDetail({isOpen, onClose, carContract, carRentalPost}: CarContractDetailProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent p="20px">
        <HStack w="100%" h="100%">
          <VStack alignItems="flex-start" flex="3">
            <Text fontSize="18px" fontWeight="500">
              THÔNG TIN HỢP ĐỒNG THUÊ XE
            </Text>
            <VStack alignItems="flex-start" gap="0">
              <Text fontWeight="500">Thông tin xe:</Text>
              <Text color="text.gray">{carRentalPost?.brand + ' - ' + carRentalPost?.model}</Text>
              <Text color="text.gray">{carRentalPost?.license_plate}</Text>
            </VStack>
            <Divider />
            <HStack w="100%">
              <VStack alignItems="flex-start" gap="0" flex="1">
                <Text fontWeight="500">Thông tin người thuê:</Text>
                <Text color="text.gray">{carContract.owner.username}</Text>
                <Text color="text.gray">{carContract.owner.phoneNumber}</Text>
              </VStack>
              <VStack alignItems="flex-start" gap="0" flex="1">
                <Text fontWeight="500">Thông tin chủ xe:</Text>
                <Text color="text.gray">{carContract.renter.username}</Text>
                <Text color="text.gray">{carContract.renter.phoneNumber}</Text>
              </VStack>
            </HStack>
            <Divider />
            <VStack alignItems="flex-start" gap="0">
              <Text fontWeight="500">Thông tin chuyến đi:</Text>
              <Text color="text.gray">
                {format(carContract.start_date, 'hh:mm dd/MM/yyyy')} -{' '}
                {format(carContract.end_date, 'hh:mm dd/MM/yyyy')}
              </Text>
              <Text color="text.gray">
                {carRentalPost?.carRentalPostAddress.district_name},{' '}
                {carRentalPost?.carRentalPostAddress.prefecture_name}
              </Text>
            </VStack>
            <Divider />
            <HStack w="100%" alignItems="flex-start">
              <VStack alignItems="flex-start" gap="0" flex="1">
                <Text fontWeight="500">Thông tin đơn giá:</Text>
                <Text color="text.gray">Phí thuê 1 ngày: {carContract.price_per_day} ETH/ngày</Text>
                <Text color="text.gray">Thế chấp: {carContract.mortgage} ETH (mặc định)</Text>
                <Text color="text.gray">Số lượng ngày: {carContract.num_of_days} ngày</Text>
                <Text color="text.gray">
                  Tổng đơn giá:{' '}
                  {carContract.price_per_day * carContract.num_of_days + carContract.mortgage} ETH
                </Text>
              </VStack>
              <VStack alignItems="flex-start" gap="0" flex="1">
                <Text color="text.gray" fontSize="12px" fontWeight="500">
                  Phụ phí:
                </Text>
                <Text fontSize="12px" color="text.gray">
                  Phí quá giờ (1 giờ): {carContract.over_time_fee} ETH
                </Text>
                <Text fontSize="12px" color="text.gray">
                  Phí quá giới hạn (1 km): {carContract.over_limit_fee} ETH
                </Text>
                <Text fontSize="12px" color="text.gray">
                  Phí vệ sinh: {carContract.cleaning_fee} ETH
                </Text>
                <Text fontSize="12px" color="text.gray">
                  Phí vệ khử mùi: {carContract.deodorization_fee} ETH
                </Text>
              </VStack>
            </HStack>
            <Divider />
            <Text pt="10px" fontSize="18px" fontWeight="500">
              TRẠNG THÁI HỢP ĐỒNG
            </Text>
            <HStack w="100%">
              <Box
                w="100px"
                as="button"
                bg="#4cd137"
                p="10px"
                borderRadius="5px"
                pointerEvents="none"
              >
                <Text fontSize="12px" color="white">
                  Chờ xác nhận
                </Text>
              </Box>
              <Icon fontSize="32px" as={MdKeyboardDoubleArrowRight} />
              <Box
                w="100px"
                as="button"
                bg="#4cd137"
                p="10px"
                borderRadius="5px"
                pointerEvents="none"
              >
                <Text fontSize="12px" color="white">
                  Đã xác nhận
                </Text>
              </Box>
              <Icon fontSize="32px" as={MdKeyboardDoubleArrowRight} />
              <Box
                w="100px"
                as="button"
                bg="gray.300"
                p="10px"
                borderRadius="5px"
                pointerEvents="none"
              >
                <Text fontSize="12px" color="white">
                  Bắt đầu
                </Text>
              </Box>
            </HStack>
          </VStack>
          <VStack
            flex="2"
            alignSelf="flex-start"
            alignItems="flex-start"
            justifyContent="flex-start"
            // h="100%"
            h="500px"
            overflowY="scroll"
          >
            <Text fontSize="18px" fontWeight="500">
              LỊCH SỬ GIAO DỊCH
            </Text>
            <Accordion allowMultiple w="100%" h="100%">
              {carContract.contractTxHistories.map(tx => {
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
        </HStack>
      </ModalContent>
    </Modal>
  )
}

export default CarContractDetail
