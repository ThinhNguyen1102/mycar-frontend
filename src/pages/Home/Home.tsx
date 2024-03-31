import {Box, useDisclosure, VStack} from '@chakra-ui/react'
import AddressSelectModel from './components/AddressSelectModal'
import DateSelectModal from './components/DateSelectModal'
import SelectAddressAndDate from './components/SelectAddressAnddDate'

function Home() {
  const {isOpen: isOpenAddress, onOpen: onOpenAddress, onClose: onCloseAddress} = useDisclosure()
  const {isOpen: isOpenDate, onOpen: onOpenDate, onClose: onCloseDate} = useDisclosure()
  return (
    <VStack pt="0px" w="calc(100vw - 10px)" bg="background" pl="80px" pr="80px">
      <Box w="100%" borderRadius="10px" overflow="hidden" position="relative">
        <img width="100%" src="/car-banner.jpg" alt="banner" />
        <Box bg="rgba(0, 0, 0, 0.3)" position="absolute" top="0" bottom="0" right="0" left="0" />
      </Box>
      <SelectAddressAndDate onOpenAddress={onOpenAddress} onOpenDate={onOpenDate} />
      <AddressSelectModel isOpen={isOpenAddress} onClose={onCloseAddress} />
      <DateSelectModal isOpen={isOpenDate} onClose={onCloseDate} />
    </VStack>
  )
}

export default Home
