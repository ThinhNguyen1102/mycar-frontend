import {Box, Button, Divider, HStack, Icon, Stack, Text, VStack} from '@chakra-ui/react'
import {IoLocationOutline} from 'react-icons/io5'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {CiCalendarDate} from 'react-icons/ci'

function Home() {
  return (
    <VStack pt="0px" w="calc(100vw - 10px)" bg="background" pl="80px" pr="80px">
      <Box w="100%" borderRadius="10px" overflow="hidden" position="relative">
        <img width="100%" src="/car-banner.jpg" alt="banner" />
        <Box bg="rgba(0, 0, 0, 0.3)" position="absolute" top="0" bottom="0" right="0" left="0" />
      </Box>
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
          <HStack w="90%" as="button" ml="32px" justifyContent="space-between">
            <Text fontSize="20px" fontWeight="bold">
              Hà Nội
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
          <HStack w="90%" as="button" ml="32px" justifyContent="space-between">
            <Text fontSize="20px" fontWeight="bold">
              Hà Nộiiiiiiiiiiiiiiiiiiiiiiii
            </Text>
            <Box fontSize="20px" pt="7px">
              <Icon as={MdOutlineKeyboardArrowDown} />
            </Box>
          </HStack>
        </VStack>
        <Box alignSelf={{base: 'flex-end', lg: 'center'}}>
          <Button h={{base: '40px', xl: '78px'}} p="0 30px" fontSize="16px" flex="1">
            Tìm Xe
          </Button>
        </Box>
      </Stack>
    </VStack>
  )
}

export default Home
