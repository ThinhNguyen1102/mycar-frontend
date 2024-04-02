import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SystemStyleObject,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import FeatureSelect from './components/FeatureSelect'
import {useState} from 'react'
import AddressSelectModel from '../Home/components/AddressSelectModal'
import {GrMapLocation} from 'react-icons/gr'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import {TiDeleteOutline} from 'react-icons/ti'

type ImageLocal = {
  url: string
  file: File
}

function Owner() {
  const [features, setFeatures] = useState<string[]>([])
  const [imagesLocal, setImagesLocal] = useState<ImageLocal[]>([])
  const {isOpen: isOpenAddress, onOpen: onOpenAddress, onClose: onCloseAddress} = useDisclosure()

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Heading p="30px 0">Đăng ký xe</Heading>
      <HStack w="80%" gap="0" p="20px" bg="white" borderRadius="10px">
        <VStack flex="1" as="form" alignItems="flex-start">
          <Text mb="20px" fontWeight="500" fontSize="24px">
            Thông tin cơ bản
          </Text>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Biển số xe:</FormLabel>
            <Input sx={styles.formInput} name="license_plate" type="text" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Hãng xe:</FormLabel>
            <Input sx={styles.formInput} name="brand" type="text" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Mẫu xe:</FormLabel>
            <Input sx={styles.formInput} name="model" type="text" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Số ghế:</FormLabel>
            <Input sx={styles.formInput} name="seat" type="number" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Năm sản xuất:</FormLabel>
            <Input sx={styles.formInput} name="year" type="number" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Truyền động:</FormLabel>
            <Select sx={styles.formInput} name="transmission">
              <option value="auto">Tự động</option>
              <option value="manual">Số sàn</option>
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Loại nhiên liệu:</FormLabel>
            <Select sx={styles.formInput} name="fuel">
              <option value="gasoline">Xăng</option>
              <option value="diesel">Dầu Diesel</option>
              <option value="electic">Điện</option>
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Mức tiêu thụ:</FormLabel>
            <Input sx={styles.formInput} name="consumption" type="number" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Mô tả:</FormLabel>
            <Input sx={styles.formInput} name="description" type="text" />
          </FormControl>
          <Divider m="20px 0" />
          <Text mb="20px" fontWeight="500" fontSize="24px">
            Tính năng
          </Text>
          <FeatureSelect features={features} setFeatures={setFeatures} />
          <Divider m="20px 0" />
          <Text mb="20px" fontWeight="500" fontSize="24px">
            Đơn giá thuê xe
          </Text>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="240px">Giá thuê xe (1 ngày):</FormLabel>
            <Input sx={styles.formInput} name="price_per_day" type="number" placeholder="ETH" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="240px">Phí vượt quá giới hạn (1 km):</FormLabel>
            <Input sx={styles.formInput} name="limit_fee" type="number" placeholder="ETH" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="240px">Phí vượt quá giờ (1 giờ):</FormLabel>
            <Input sx={styles.formInput} name="over_time_fee" type="number" placeholder="ETH" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="240px">Phí vệ sinh:</FormLabel>
            <Input sx={styles.formInput} name="cleaning_fee" type="number" placeholder="ETH" />
          </FormControl>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="240px">Phí khử mùi:</FormLabel>
            <Input sx={styles.formInput} name="deodorization_fee" type="number" placeholder="ETH" />
          </FormControl>
          <Divider m="20px 0" />
          <Text mb="20px" fontWeight="500" fontSize="24px">
            Thông tin khác
          </Text>
          <FormControl sx={styles.formControl}>
            <FormLabel minW="150px">Địa chỉ:</FormLabel>
            <InputGroup>
              <Input
                sx={styles.formInput}
                name="car_address"
                type="text"
                placeholder="Chọn địa chỉ xe của bạn"
                pointerEvents="none"
              />
              <InputRightElement
                _hover={{
                  cursor: 'pointer'
                }}
                onClick={onOpenAddress}
              >
                <Icon color="gray.300" as={GrMapLocation} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <Text alignSelf="flex-start" mb="8px" mr="12px" fontWeight="500" minW="150px">
              Hình ảnh:
            </Text>
            <Input
              onChange={e => {
                console.log('change')
                if (e.target?.files?.length) {
                  setImagesLocal(prev => {
                    if (e.target?.files?.length) {
                      const newValue = [...prev]

                      for (let i = 0; i < e.target.files.length; i++) {
                        const file = e.target.files[i]
                        const src = URL.createObjectURL(file)

                        newValue.push({
                          url: src,
                          file
                        })
                      }

                      return newValue
                    }

                    return prev
                  })
                }
              }}
              name="images"
              type="file"
              accept="image/*"
              value=""
              multiple
              hidden
            />
            <HStack
              wrap="wrap"
              borderRadius="5px"
              flex="1"
              minH="80px"
              border="1px"
              borderColor="gray.200"
              p="10px"
              alignItems="center"
            >
              <FormLabel
                display="flex"
                alignItems="center"
                justifyContent="center"
                m="0"
                alignSelf="flex-start"
                w="60px"
                h="60px"
                border="1px"
                borderColor="gray.300"
                borderRadius="5px"
              >
                <Icon
                  _hover={{
                    cursor: 'pointer'
                  }}
                  color="gray.300"
                  fontSize="20px"
                  as={MdOutlineAddPhotoAlternate}
                />
              </FormLabel>
              {imagesLocal.map((val, index) => (
                <Box
                  borderRadius="5px"
                  overflow="hidden"
                  key={index}
                  bgImg={`url(${val.url})`}
                  bgSize="cover"
                  bgPos="center"
                  w="60px"
                  h="60px"
                  position="relative"
                >
                  <VStack
                    position="absolute"
                    top="0"
                    bottom="0"
                    right="0"
                    left="0"
                    opacity="0"
                    bg="rgba(0, 0, 0, 0.5)"
                    _hover={{
                      opacity: '1'
                    }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      onClick={() => {
                        setImagesLocal(prev => prev.filter((_, i) => i !== index))
                      }}
                      _hover={{
                        cursor: 'pointer'
                      }}
                      color="#bbb"
                      fontSize="24px"
                      as={TiDeleteOutline}
                    />
                  </VStack>
                </Box>
              ))}
            </HStack>
          </FormControl>
        </VStack>
        <VStack flex="1">
          <Text fontWeight="500" fontSize="24px">
            Ảnh xe
          </Text>
        </VStack>
      </HStack>
      <AddressSelectModel isOpen={isOpenAddress} onClose={onCloseAddress} />
    </VStack>
  )
}

type Styles = {
  formControl: SystemStyleObject
  formInput: SystemStyleObject
}

const styles: Styles = {
  formControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    w: '100%'
  },
  formInput: {
    _focusVisible: {
      boxShadow: 'none'
    }
  }
}

export default Owner
