import {Checkbox, Divider, HStack, Text, VStack} from '@chakra-ui/react'
import {CarContractStatus} from '../../../../enums/common.enum'

interface CarContractFilterProps {
  statuses: string[]
  setStatuses: (statuses: string[]) => void
  types: string[]
  setTypes: (types: string[]) => void
  setCurrentPage: (page: number) => void
}

function CarContractFilter({
  statuses,
  setStatuses,
  types,
  setTypes,
  setCurrentPage
}: CarContractFilterProps) {
  console.log(statuses)
  return (
    <VStack w="100%" gap="20px">
      <HStack alignSelf="flex-start">
        <Text minW="120px" fontSize="16px" fontWeight="500">
          Trạng thái
        </Text>
        <Checkbox
          size="lg"
          defaultChecked={statuses.includes(CarContractStatus.WAITING_APPROVAL)}
          onChange={e => {
            if (e.target.checked) {
              setStatuses([...statuses, CarContractStatus.WAITING_APPROVAL])
            } else {
              setStatuses(statuses.filter(status => status !== CarContractStatus.WAITING_APPROVAL))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Chờ xác nhận
          </Text>
        </Checkbox>
        <Checkbox
          size="lg"
          minW="100px"
          defaultChecked={statuses.includes(CarContractStatus.APPROVED)}
          onChange={e => {
            if (e.target.checked) {
              setStatuses([...statuses, CarContractStatus.APPROVED])
            } else {
              setStatuses(statuses.filter(status => status !== CarContractStatus.APPROVED))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Đã xác nhận
          </Text>
        </Checkbox>
        <Checkbox
          size="lg"
          defaultChecked={statuses.includes(CarContractStatus.STARTED)}
          onChange={e => {
            if (e.target.checked) {
              setStatuses([...statuses, CarContractStatus.STARTED])
            } else {
              setStatuses(statuses.filter(status => status !== CarContractStatus.STARTED))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Đã bắt đầu
          </Text>
        </Checkbox>
        <Checkbox
          size="lg"
          defaultChecked={statuses.includes(CarContractStatus.ENDED)}
          onChange={e => {
            if (e.target.checked) {
              setStatuses([...statuses, CarContractStatus.ENDED])
            } else {
              setStatuses(statuses.filter(status => status !== CarContractStatus.ENDED))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Đã kết thúc
          </Text>
        </Checkbox>
        <Checkbox
          size="lg"
          defaultChecked={statuses.includes(CarContractStatus.REJECTED)}
          onChange={e => {
            if (e.target.checked) {
              setStatuses([...statuses, CarContractStatus.REJECTED])
            } else {
              setStatuses(statuses.filter(status => status !== CarContractStatus.REJECTED))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Đã bị từ chối
          </Text>
        </Checkbox>
        <Checkbox
          size="lg"
          defaultChecked={statuses.includes(CarContractStatus.CANCELED)}
          onChange={e => {
            if (e.target.checked) {
              setStatuses([...statuses, CarContractStatus.CANCELED])
            } else {
              setStatuses(statuses.filter(status => status !== CarContractStatus.CANCELED))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Đã bị hủy
          </Text>
        </Checkbox>
      </HStack>
      <HStack alignSelf="flex-start">
        <Text minW="120px" fontSize="16px" fontWeight="500">
          Loại hợp đồng
        </Text>
        <Checkbox
          size="lg"
          defaultChecked={types.includes('renter')}
          onChange={e => {
            if (e.target.checked) {
              setTypes([...types, 'renter'])
            } else {
              setTypes(types.filter(type => type !== 'renter'))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Thuê
          </Text>
        </Checkbox>
        <Checkbox
          size="lg"
          defaultChecked={types.includes('owner')}
          onChange={e => {
            if (e.target.checked) {
              setTypes([...types, 'owner'])
            } else {
              setTypes(types.filter(type => type !== 'owner'))
            }
            setCurrentPage(1)
          }}
        >
          <Text minW="100px" fontSize="16px">
            Cho Thuê
          </Text>
        </Checkbox>
      </HStack>
    </VStack>
  )
}

export default CarContractFilter
