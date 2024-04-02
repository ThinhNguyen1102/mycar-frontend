import {Icon, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import {BiCategory} from 'react-icons/bi'

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

interface FeatureSelectProps {
  features: string[]
  setFeatures: (features: string[]) => void
}

function FeatureSelect({features, setFeatures}: FeatureSelectProps) {
  function onClickFeature(feature: string) {
    if (features.includes(feature)) {
      setFeatures(features.filter(item => item !== feature))
    } else {
      setFeatures([...features, feature])
    }
  }
  return (
    <SimpleGrid w="100%" minChildWidth="25%" gap="20px">
      {fixFeatures.map((item, index) => (
        <VStack
          gap="0"
          border="1px"
          borderColor={features.includes(item) ? 'black' : 'gray.200'}
          boxShadow={features.includes(item) ? 'md' : 'none'}
          p="10px"
          borderRadius="5px"
          key={index}
          onClick={() => onClickFeature(item)}
          _hover={{cursor: 'pointer'}}
        >
          <Icon color="text.gray" fontSize="24px" as={BiCategory} />
          <Text color="text.gray">{item}</Text>
        </VStack>
      ))}
    </SimpleGrid>
  )
}

export default FeatureSelect
