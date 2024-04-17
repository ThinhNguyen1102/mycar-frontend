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
      <CarContractList isRenterTrips />
      {/* <Tabs variant="enclosed" w="80%" bg="white" borderRadius="10px"> 
         <TabList mb="1em" h="60px">
          <Tab fontWeight="500">CHUYẾN THUÊ</Tab>
          <Tab fontWeight="500">CHUYẾN CHO THUÊ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CarContractList isRenterTrips />
          </TabPanel>
          <TabPanel>
            <CarContractList isRenterTrips={false} />
          </TabPanel>
        </TabPanels> 
      </Tabs> */}
    </VStack>
  )
}

export default MyTrip
