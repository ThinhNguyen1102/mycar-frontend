import {Box, Button, Divider, HStack, Icon, Stack, Text, VStack} from '@chakra-ui/react'
import {CiCalendarDate} from 'react-icons/ci'
import {IoLocationOutline} from 'react-icons/io5'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {Address} from '../../../../types/common.type'

interface SelectAddressAndDateProps {
  onOpenAddress: () => void
  onOpenDate: () => void
  address: Address | undefined
}

function SelectAddressAndDate({onOpenDate, onOpenAddress, address}: SelectAddressAndDateProps) {
  return (
    <Stack
      w={{base: '95%', xl: '80%'}}
      h={{base: '260px', lg: '120px'}}
      flexDirection={{base: 'column', lg: 'row'}}
      bg="white"
      borderRadius="10px"
      boxShadow=" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      transform="TranslateY(-70px)"
      p={{base: '20px 20px', lg: '0 20px'}}
      gap="20px"
    >
      <VStack gap="0px" alignItems="flex-start" flex="3" justifyContent="center">
        <HStack>
          <Box lineHeight="1" color="text.gray" fontSize="24px" pt="5px">
            <Icon as={IoLocationOutline} />
          </Box>
          <Text color="text.gray">Địa điểm</Text>
        </HStack>
        <HStack
          w="90%"
          as="button"
          ml="32px"
          justifyContent="space-between"
          onClick={onOpenAddress}
        >
          <Text fontSize="16px" fontWeight="bold" textAlign="left">
            {address?.prefecture_name && address?.district_name
              ? `${address.district_name}, ${address.prefecture_name}`
              : 'Chọn địa điểm'}
          </Text>
          <Box fontSize="20px" pt="7px">
            <Icon as={MdOutlineKeyboardArrowDown} />
          </Box>
        </HStack>
      </VStack>
      <Divider orientation="vertical" display={{base: 'none', lg: 'block'}} />
      <VStack gap="0px" alignItems="flex-start" flex="4" justifyContent="center">
        <HStack>
          <Box lineHeight="1" color="text.gray" fontSize="24px" pt="5px">
            <Icon as={CiCalendarDate} />
          </Box>
          <Text color="text.gray">Thời gian thuê</Text>
        </HStack>
        <HStack w="90%" as="button" ml="32px" justifyContent="space-between" onClick={onOpenDate}>
          <Text fontSize="20px" fontWeight="bold">
            Hà Nộiiiiiiiiiiiiiiiiiiiiiiii
          </Text>
          <Box fontSize="20px" pt="7px">
            <Icon as={MdOutlineKeyboardArrowDown} />
          </Box>
        </HStack>
      </VStack>
      <Box alignSelf={{base: 'flex-end', lg: 'center'}}>
        <Button h={{base: '40px', lg: '78px'}} p="0 30px" fontSize="16px" flex="1">
          Tìm Xe
        </Button>
      </Box>
    </Stack>
  )
}

export default SelectAddressAndDate
