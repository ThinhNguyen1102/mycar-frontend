import {Box, Divider, Heading, HStack, Icon, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import {BiCategory} from 'react-icons/bi'
import {BsLuggage} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {MdOutlineGasMeter} from 'react-icons/md'
import {PiArmchairBold, PiGasCanBold} from 'react-icons/pi'
import {TbManualGearbox} from 'react-icons/tb'

const fixFeatures = [
  'Bản đồ',
  'Bluetooth',
  'Camrea 360',
  'Camera cập lề',
  'Camera hành trình',
  'Camera lùi',
  'Cảm biến lốp',
  'Cảm biến va chạm',
  'Cảnh báo tốc độ',
  'Cửa sổ trời',
  'Định vị GPS',
  'Ghế trẻ em',
  'Khe cắm USB',
  'Lốp dự phòng',
  'Màn hình DVD',
  'Nắp thùng xe bán tải',
  'ETC',
  'Túi khí an toàn'
]

function PostDetailInfo() {
  return (
    <VStack p="20px" borderRadius="10px" mt="20px" bg="white" flex="4" w="100%" gap="20px">
      <VStack w="100%" alignItems="flex-start">
        <Heading>TOYOTA VELOZ CROSS 2022</Heading>
        <HStack w="100%" gap="15px">
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
          <HStack>
            <Box pt="5px">
              <Icon as={IoLocationOutline} />
            </Box>
            <Text color="text.gray" display="inline">
              Cầu Giấy, Hà Nội
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
              <Text fontWeight="500">4 chỗ</Text>
            </VStack>
          </HStack>
          <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
            <Icon fontSize="28px" as={TbManualGearbox} />
            <VStack alignItems="flex-start">
              <Text fontSize="12px" color="text.gray">
                Truyền động
              </Text>
              <Text fontWeight="500">Số tự động</Text>
            </VStack>
          </HStack>
          <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
            <Icon fontSize="28px" as={PiGasCanBold} />
            <VStack alignItems="flex-start">
              <Text fontSize="12px" color="text.gray">
                Nhiên liệu
              </Text>
              <Text fontWeight="500">Xăng</Text>
            </VStack>
          </HStack>
          <HStack gap="15px" p="0 10px" h="100px" minW="150px" borderRadius="10px">
            <Icon fontSize="28px" as={MdOutlineGasMeter} />
            <VStack alignItems="flex-start">
              <Text fontSize="12px" color="text.gray">
                NL tiêu hao
              </Text>
              <Text fontWeight="500">7 lít/100km</Text>
            </VStack>
          </HStack>
        </HStack>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Mô tả
        </Text>
        <Text color="text.gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus
        </Text>
      </VStack>
      <Divider w="100%" />
      <VStack w="100%" alignItems="flex-start">
        <Text fontWeight="500" fontSize="20px">
          Các tiện nghi khác
        </Text>
        <SimpleGrid w="100%" minChildWidth="25%" gap="10px">
          {fixFeatures.map((item, index) => (
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
    </VStack>
  )
}

export default PostDetailInfo
