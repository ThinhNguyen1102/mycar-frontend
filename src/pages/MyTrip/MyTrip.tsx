import {Heading, VStack} from '@chakra-ui/react'
import {useEffect} from 'react'

import CarContractList from './components/CarContractList'

function MyTrip() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Heading p="30px 0">Chuyến của tôi</Heading>
      <CarContractList />
    </VStack>
  )
}

export default MyTrip
