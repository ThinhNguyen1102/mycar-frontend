import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  SystemStyleObject,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import FeatureSelect from '../FeatureSelect'
import {useEffect, useState} from 'react'
import {Address} from '../../../../types/common.type'
import {useForm} from 'react-hook-form'
import callApi from '../../../../utils/api'
import {GrMapLocation} from 'react-icons/gr'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import {TiDeleteOutline} from 'react-icons/ti'
import AddressSelectModel from '../../../../components/AddressSelectModal'
import {CarRentalPost} from '../../../../types/api-response.type'

type ImageLocal = {
  url: string
  file: File
}

type CarRentalInputs = {
  license_plate: string
  brand: string
  model: string
  seat: number
  year: number
  transmission: 'auto' | 'manual'
  fuel: 'gasoline' | 'diesel' | 'electric'
  consumption: number
  description: string
  price_per_day: number
  over_limit_fee: number
  over_time_fee: number
  cleaning_fee: number
  deodorization_fee: Number
}

interface CarRentalPostFormProps {
  currentEditPost: CarRentalPost | null
  setCurrentEditPost: React.Dispatch<React.SetStateAction<CarRentalPost | null>>
}

function CarRentalPostForm({currentEditPost, setCurrentEditPost}: CarRentalPostFormProps) {
  const [features, setFeatures] = useState<string[]>([])
  const [imagesLocal, setImagesLocal] = useState<ImageLocal[]>([])
  const {isOpen: isOpenAddress, onOpen: onOpenAddress, onClose: onCloseAddress} = useDisclosure()
  const [address, setAddress] = useState<Address>()

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    clearErrors
  } = useForm<CarRentalInputs>()

  useEffect(() => {
    clearErrors()
  }, [clearErrors, currentEditPost])

  useEffect(() => {
    if (!currentEditPost) return

    setValue('license_plate', currentEditPost.license_plate)
    setValue('brand', currentEditPost.brand)
    setValue('model', currentEditPost.model)
    setValue('seat', currentEditPost.seats)
    setValue('year', currentEditPost.year)
    setValue('transmission', currentEditPost.transmission as 'auto' | 'manual')
    setValue('fuel', currentEditPost.fuel as 'gasoline' | 'diesel' | 'electric')
    setValue('consumption', currentEditPost.consumption)
    setValue('description', currentEditPost.description)
    setValue('price_per_day', currentEditPost.price_per_day)
    setValue('over_limit_fee', currentEditPost.over_limit_fee)
    setValue('over_time_fee', currentEditPost.over_time_fee)
    setValue('cleaning_fee', currentEditPost.cleaning_fee)
    setValue('deodorization_fee', currentEditPost.deodorization_fee)

    setFeatures(currentEditPost.carRentalPostFeatures)
    setAddress({
      district_name: currentEditPost.carRentalPostAddress.district_name,
      prefecture_name: currentEditPost.carRentalPostAddress.prefecture_name
    })
  }, [currentEditPost, setValue])

  const onSubmit = async (data: CarRentalInputs) => {
    const formatData = {
      district_name: address?.district_name,
      prefecture_name: address?.prefecture_name,
      model: data.model,
      seats: data.seat,
      fuel: data.fuel,
      description: data.description,
      transmission: data.transmission,
      brand: data.brand,
      license_plate: data.license_plate,
      price_per_day: data.price_per_day,
      over_limit_fee: data.over_limit_fee,
      over_time_fee: data.over_time_fee,
      cleaning_fee: data.cleaning_fee,
      deodorization_fee: data.deodorization_fee,
      year: data.year,
      consumption: data.consumption,
      car_image_urls: [
        'https://fastly.picsum.photos/id/889/200/300.jpg?hmac=7pLzsJkl44GS15ct5pL5EiK1I7p-uvVr9xWSB5Xhipw',
        'https://fastly.picsum.photos/id/341/200/300.jpg?hmac=tZpxFpS1LmFfC4e_ChqA5I8JfUfJuwH3oZvmQ58SzHc'
      ],
      car_feature_ids: features.map((_, index) => index + 1)
    }
    try {
      if (currentEditPost) {
        const {data: response} = await callApi<any>(
          `/api/v1/car-rental-posts/${currentEditPost.id}`,
          'PUT',
          formatData
        )
        if (response) {
          console.log('update post ok')
          setCurrentEditPost(null)
        }
      } else {
        const {data: response} = await callApi<any>('/api/v1/car-rental-posts', 'POST', formatData)
        if (response) {
          console.log('create post ok')
        }
      }
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <VStack onSubmit={handleSubmit(onSubmit)} flex="1" as="form" alignItems="flex-start">
      <Text mb="20px" fontWeight="500" fontSize="24px">
        Thông tin cơ bản
      </Text>
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Biển số xe:</FormLabel>
        <Input
          sx={styles.formInput}
          type="text"
          {...register('license_plate', {
            required: {
              value: true,
              message: 'Biển số xe không được để trống.'
            },
            pattern: {
              value: /^[0-9]{2}[A-Z]{1}-[0-9]{4,5}$/g,
              message: 'Biển số xe không hợp lệ.'
            }
          })}
        />
      </FormControl>
      {errors.license_plate && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.license_plate.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Hãng xe:</FormLabel>
        <Input
          sx={styles.formInput}
          type="text"
          {...register('brand', {
            required: {
              value: true,
              message: 'Hãng xe không được để trống.'
            }
          })}
        />
      </FormControl>
      {errors.brand && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.brand.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Mẫu xe:</FormLabel>
        <Input
          sx={styles.formInput}
          type="text"
          {...register('model', {
            required: {
              value: true,
              message: 'Mẫu xe không được để trống.'
            }
          })}
        />
      </FormControl>
      {errors.model && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.model.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Số ghế:</FormLabel>
        <Input
          sx={styles.formInput}
          {...register('seat', {
            required: {
              value: true,
              message: 'Số ghế không được để trống.'
            },
            min: {
              value: 1,
              message: 'Số ghế phải lớn hơn 0.'
            },
            max: {
              value: 99,
              message: 'Số ghế phải nhỏ hơn 100.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.seat && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.seat.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Năm sản xuất:</FormLabel>
        <Input
          sx={styles.formInput}
          type="number"
          {...register('year', {
            required: {
              value: true,
              message: 'Năm sản xuất không được để trống.'
            },
            min: {
              value: 1900,
              message: 'Năm sản xuất phải lớn hơn 1900.'
            },
            max: {
              value: new Date().getFullYear(),
              message: `Năm sản xuất phải nhỏ hơn ${new Date().getFullYear()}.`
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.year && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.year.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Truyền động:</FormLabel>
        <Select
          sx={styles.formInput}
          {...register('transmission', {
            required: {
              value: true,
              message: 'Truyền động không được để trống.'
            }
          })}
        >
          <option value="auto">Tự động</option>
          <option value="manual">Số sàn</option>
        </Select>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Loại nhiên liệu:</FormLabel>
        <Select
          sx={styles.formInput}
          {...register('fuel', {
            required: {
              value: true,
              message: 'Loại nhiên liệu không được để trống.'
            }
          })}
        >
          <option value="gasoline">Xăng</option>
          <option value="diesel">Dầu Diesel</option>
          <option value="electric">Điện</option>
        </Select>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Mức tiêu thụ:</FormLabel>
        <Input
          sx={styles.formInput}
          type="number"
          {...register('consumption', {
            required: {
              value: true,
              message: 'Mức tiêu thụ không được để trống.'
            },
            min: {
              value: 1,
              message: 'Mức tiêu thụ phải lớn hơn 0.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.consumption && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.consumption.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Mô tả:</FormLabel>
        <Input
          sx={styles.formInput}
          type="text"
          {...register('description', {
            required: {
              value: true,
              message: 'Mô tả không được để trống.'
            }
          })}
        />
      </FormControl>
      {errors.description && (
        <Text ml="162px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.description.message}
        </Text>
      )}
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
        <Input
          sx={styles.formInput}
          type="number"
          step="0.001"
          placeholder="ETH"
          {...register('price_per_day', {
            required: {
              value: true,
              message: 'Giá thuê xe không được để trống.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.price_per_day && (
        <Text ml="252px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.price_per_day.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="240px">Phí vượt quá giới hạn (1 km):</FormLabel>
        <Input
          sx={styles.formInput}
          type="number"
          step="0.001"
          placeholder="ETH"
          {...register('over_limit_fee', {
            required: {
              value: true,
              message: 'Giá thuê xe không được để trống.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.over_limit_fee && (
        <Text ml="252px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.over_limit_fee.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="240px">Phí vượt quá giờ (1 giờ):</FormLabel>
        <Input
          sx={styles.formInput}
          type="number"
          step="0.001"
          placeholder="ETH"
          {...register('over_time_fee', {
            required: {
              value: true,
              message: 'Giá thuê xe không được để trống.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.over_time_fee && (
        <Text ml="252px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.over_time_fee.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="240px">Phí vệ sinh:</FormLabel>
        <Input
          sx={styles.formInput}
          type="number"
          step="0.001"
          placeholder="ETH"
          {...register('cleaning_fee', {
            required: {
              value: true,
              message: 'Giá thuê xe không được để trống.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.cleaning_fee && (
        <Text ml="252px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.cleaning_fee.message}
        </Text>
      )}
      <FormControl sx={styles.formControl}>
        <FormLabel minW="240px">Phí khử mùi:</FormLabel>
        <Input
          sx={styles.formInput}
          type="number"
          step="0.001"
          placeholder="ETH"
          {...register('deodorization_fee', {
            required: {
              value: true,
              message: 'Giá thuê xe không được để trống.'
            },
            valueAsNumber: true
          })}
        />
      </FormControl>
      {errors.deodorization_fee && (
        <Text ml="252px" minH="16px" fontWeight="500" fontSize="12px" color="text.error">
          {errors.deodorization_fee.message}
        </Text>
      )}
      <Divider m="20px 0" />
      <Text mb="20px" fontWeight="500" fontSize="24px">
        Thông tin khác
      </Text>
      <FormControl sx={styles.formControl}>
        <FormLabel minW="150px">Địa chỉ:</FormLabel>
        <HStack
          w="100%"
          bg="white"
          border="1px"
          borderColor="gray.200"
          borderRadius="5px"
          h="40px"
          p="16px"
          justifyContent="space-between"
        >
          <Box>
            <Text textOverflow="ellipsis" whiteSpace="nowrap">
              {address?.prefecture_name && address?.district_name
                ? `${address.district_name}, ${address.prefecture_name}`
                : 'Chọn địa điểm'}
            </Text>
          </Box>
          <Icon
            _hover={{
              cursor: 'pointer'
            }}
            onClick={onOpenAddress}
            color="gray.300"
            as={GrMapLocation}
          />
        </HStack>
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
      <Divider m="20px 0" />
      <HStack alignSelf="flex-end">
        <Button type="submit">{currentEditPost ? 'Cập nhật' : 'Đăng ký'}</Button>
        {currentEditPost && (
          <Button
            onClick={() => {
              setCurrentEditPost(null)
              setFeatures([])
              setImagesLocal([])
              setAddress(undefined)
              reset()
            }}
          >
            Hủy
          </Button>
        )}
      </HStack>
      <AddressSelectModel
        isOpen={isOpenAddress}
        onClose={onCloseAddress}
        address={address}
        setAddress={setAddress}
      />
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

export default CarRentalPostForm
