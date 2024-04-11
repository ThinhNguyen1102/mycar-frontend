import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select
} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import {Address, DistrictAPIdata, ProvinceAPIdata} from '../../types/common.type'
import axios from 'axios'

interface AddressModelProps {
  isOpen: boolean
  onClose: () => void
  address: Address | undefined
  setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
}

function AddressSelectModel({isOpen, onClose, address, setAddress}: AddressModelProps) {
  const [provinces, setProvinces] = React.useState<ProvinceAPIdata[]>([])
  const [districts, setDistricts] = React.useState<DistrictAPIdata[]>([])

  useEffect(() => {
    const fetchProvinces = async () => {
      const {data: response} = await axios.get('https://vapi.vnappmob.com/api/province')

      setProvinces(response.results)
    }

    fetchProvinces()
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Địa điểm</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Tỉnh/Thành phố</FormLabel>
            <Select
              placeholder="Select option"
              _focusVisible={{
                boxShadow: 'none'
              }}
              onChange={async e => {
                const province_id = e.target.value
                setAddress(prev => {
                  return {
                    district_name: '',
                    prefecture_name: provinces.find(
                      province => province.province_id === province_id
                    )?.province_name
                  } as Address
                })

                if (province_id) {
                  const {data: response} = await axios.get(
                    `https://vapi.vnappmob.com/api/province/district/${province_id}`
                  )
                  setDistricts(
                    response.results.map((districy: any) => {
                      return {
                        district_name: districy.district_name,
                        district_id: districy.district_id,
                        province_id: districy.province_id,
                        district_type: districy.district_type
                      }
                    })
                  )
                }
              }}
              placeContent={address?.prefecture_name ?? '...'}
            >
              {provinces.map(province => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quận/Huyện</FormLabel>
            <Select
              placeholder="Select option"
              _focusVisible={{
                boxShadow: 'none'
              }}
              onChange={e => {
                setAddress(prev => {
                  return {
                    ...prev,
                    district_name: districts.find(
                      (district: DistrictAPIdata) => district.district_id === e.target.value
                    )?.district_name
                  } as Address
                })
              }}
              placeContent={address?.prefecture_name ?? '...'}
            >
              {districts.map(district => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Tiếp tục</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddressSelectModel
