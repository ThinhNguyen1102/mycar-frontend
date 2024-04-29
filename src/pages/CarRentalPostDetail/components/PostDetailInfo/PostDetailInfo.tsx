import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react'
import {BiCategory} from 'react-icons/bi'
import {BsLuggage} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {MdOutlineGasMeter} from 'react-icons/md'
import {PiArmchairBold, PiGasCanBold} from 'react-icons/pi'
import {TbManualGearbox} from 'react-icons/tb'
import {CarRentalPost} from '../../../../types/api-response.type'
import React from 'react'

interface PostDetailInfoProps {
  carRentalPost: CarRentalPost | undefined
}

function PostDetailInfo({carRentalPost}: PostDetailInfoProps) {
  return (
    <VStack p="20px" borderRadius="10px" mt="20px" bg="white" flex="1" w="100%" gap="20px">
      <VStack w="100%" alignItems="flex-start">
        <Heading>{carRentalPost?.brand + ' - ' + carRentalPost?.model}</Heading>
        <HStack w="100%" gap="15px">
          <HStack>
            <Icon as={FaRegStar} />
            <Text color="text.gray" display="inline">
              {carRentalPost?.seats}
            </Text>
          </HStack>
          <HStack>
            <Icon as={BsLuggage} />
            <Text color="text.gray" display="inline">
              4 chuyến
            </Text>
          </HStack>
          <HStack>
            <Box pt="5px">
              <Icon as={IoLocationOutline} />
            </Box>
            <Text color="text.gray" display="inline">
              {carRentalPost?.carRentalPostAddress.district_name +
                ', ' +
                carRentalPost?.carRentalPostAddress.prefecture_name}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Đặc điểm
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
            <Icon fontSize="28px" as={PiArmchairBold} />
            <VStack alignItems="flex-start">
              <Text fontSize="12px" color="text.gray">
                Số ghế
              </Text>
              <Text fontWeight="500">{carRentalPost?.seats} chỗ</Text>
            </VStack>
          </HStack>
          <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
            <Icon fontSize="28px" as={TbManualGearbox} />
            <VStack alignItems="flex-start">
              <Text fontSize="12px" color="text.gray">
                Truyền động
              </Text>
              <Text fontWeight="500">
                {carRentalPost?.transmission === 'auto' ? 'Số tự động' : 'Số sàn'}
              </Text>
            </VStack>
          </HStack>
          <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
            <Icon fontSize="28px" as={PiGasCanBold} />
            <VStack alignItems="flex-start">
              <Text fontSize="12px" color="text.gray">
                Nhiên liệu
              </Text>
              <Text fontWeight="500">
                {carRentalPost?.fuel === 'electric' && 'Điện'}
                {carRentalPost?.fuel === 'gasoline' && 'Xăng'}
                {carRentalPost?.fuel === 'diesel' && 'Dầu diesel'}
              </Text>
            </VStack>
          </HStack>
          {carRentalPost?.fuel !== 'electric' && (
            <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
              <Icon fontSize="28px" as={MdOutlineGasMeter} />
              <VStack alignItems="flex-start">
                <Text fontSize="12px" color="text.gray">
                  NL tiêu hao
                </Text>
                <Text fontWeight="500">{carRentalPost?.consumption} lít/100km</Text>
              </VStack>
            </HStack>
          )}
        </HStack>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Mô tả
        </Text>
        <Text color="text.gray">{carRentalPost?.description}</Text>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Các tiện nghi khác
        </Text>
        <SimpleGrid w="100%" minChildWidth="25%" gap="10px">
          {carRentalPost?.carRentalPostFeatures.map((item, index) => (
            <HStack gap="10px" p="10px" borderRadius="5px" key={index}>
              <Icon color="text.gray" fontSize="24px" as={BiCategory} />
              <Text color="text.gray">{item}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Điều khoản
        </Text>
        <Text color="text.gray">Quy định:</Text>
        <VStack w="100%" alignItems="flex-start" gap="0">
          <Text color="text.gray">- Sử dụng xe đúng mục đích.</Text>
          <Text color="text.gray">
            - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
          </Text>
          <Text color="text.gray">- Không sử dụng xe thuê để cầm cố, thế chấp.</Text>
          <Text color="text.gray">- Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</Text>
          <Text color="text.gray">- Không chở hàng quốc cấm dễ cháy nổ.</Text>
          <Text color="text.gray">- Không chở hoa quả, thực phẩm nặng mùi trong xe.</Text>
          <Text color="text.gray">
            - Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ
            hoặc gửi phụ thu phí vệ sinh xe.
          </Text>
        </VStack>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Quy định hủy chuyến
        </Text>
        <Text color="text.gray">Quy định:</Text>
        <VStack w="100%" alignItems="flex-start" gap="0">
          <Text color="text.gray">- Người hủy chuyến sẽ chịu phí 25% tổng đơn giá.</Text>
          <Text color="text.gray">
            - Quản trị viên có quyền hủy chuyến nếu có lý do chính đáng (không mất phí).
          </Text>
        </VStack>
      </VStack>
      <VStack w="100%" alignItems="flex-start" gap="20px">
        <Text fontWeight="500" fontSize="20px">
          Chủ xe
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <HStack gap="20px">
            <Avatar size="xl" />
            <VStack alignItems="flex-start" gap="5px">
              <Text fontWeight="500" fontSize="20px">
                {carRentalPost?.owner.username}
              </Text>
              <HStack gap="15px">
                <HStack>
                  <Icon fontSize="14px" as={FaRegStar} />
                  <Text fontWeight="bold" fontSize="12px" color="text.gray" display="inline">
                    4
                  </Text>
                </HStack>
                <HStack>
                  <Icon fontSize="14px" as={BsLuggage} />
                  <Text fontWeight="bold" fontSize="12px" color="text.gray" display="inline">
                    4 chuyến
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </HStack>
          <VStack gap="5px">
            <Text color="text.gray">Tỉ lệ đồng ý</Text>
            <Text fontSize="20px" fontWeight="500">
              70%
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default PostDetailInfo
