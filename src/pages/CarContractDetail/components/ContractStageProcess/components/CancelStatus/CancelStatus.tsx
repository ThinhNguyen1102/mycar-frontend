import {HStack, Icon, SystemStyleObject, Text, VStack} from '@chakra-ui/react'
import {IoIosInformationCircleOutline} from 'react-icons/io'

export default function CancelStatus() {
  return (
    <HStack w="100%" justifyContent="space-between">
      <VStack alignItems="flex-start" gap="0">
        <Text fontWeight="500" mb="5px">
          Hợp đồng đã bị hủy.
        </Text>
        <Text sx={styles.note}>
          <Icon transform="translateY(2px)" mr="2px" as={IoIosInformationCircleOutline} />
          Hợp đồng đã bị hủy. Số tiền đã thanh toán sẽ được hoàn lại cho người thuê và chủ xe (bao
          gồm phí đền bù do người hủy phải chịu).
        </Text>
      </VStack>
    </HStack>
  )
}

type Styles = {
  note: SystemStyleObject
  status_tag: SystemStyleObject
}

const styles: Styles = {
  note: {
    fontSize: '14px',
    color: 'text.gray',
    maxW: '600px',
    textAlign: 'justify'
  },
  status_tag: {
    color: 'white',
    minW: '100px',
    fontSize: '12px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
