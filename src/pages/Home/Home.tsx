import {Box, SimpleGrid, useDisclosure, VStack} from '@chakra-ui/react'
import AddressSelectModel from './components/AddressSelectModal'
import DateSelectModal from './components/DateSelectModal'
import SelectAddressAndDate from './components/SelectAddressAnddDate'
import CarRentalPostItem from './components/CaRentalPostItem'
import {useEffect, useState} from 'react'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import {DateRange} from 'react-day-picker'
import {Address} from '../../types/common.type'

function Home() {
  const {isOpen: isOpenAddress, onOpen: onOpenAddress, onClose: onCloseAddress} = useDisclosure()
  const {isOpen: isOpenDate, onOpen: onOpenDate, onClose: onCloseDate} = useDisclosure()
  const [range, setRange] = useState<DateRange | undefined>()
  const [address, setAddress] = useState<Address>()

  const {carRentalPosts} = useCarRentalPostStore(state => state)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack pb="40px" pt="0px" w="calc(100vw - 10px)" bg="background" pl="80px" pr="80px">
      <Box w="100%" borderRadius="10px" overflow="hidden" position="relative">
        <img width="100%" src="/car-banner.jpg" alt="banner" />
        <Box bg="rgba(0, 0, 0, 0.3)" position="absolute" top="0" bottom="0" right="0" left="0" />
      </Box>
      <SelectAddressAndDate
        address={address}
        onOpenAddress={onOpenAddress}
        onOpenDate={onOpenDate}
      />
      <SimpleGrid
        minChildWidth={{md: '38vw', lg: '24vw', xl: '28vw', '2xl': '20vw'}}
        spacing={4}
        w="100%"
      >
        {carRentalPosts.map((carRentalPost, index) => (
          <CarRentalPostItem key={index} carRentalPost={carRentalPost} />
        ))}
      </SimpleGrid>
      <AddressSelectModel
        isOpen={isOpenAddress}
        onClose={onCloseAddress}
        address={address}
        setAddress={setAddress}
      />
      <DateSelectModal
        isOpen={isOpenDate}
        onClose={onCloseDate}
        range={range}
        setRange={setRange}
      />
    </VStack>
  )
}

export default Home
