import {Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from '@chakra-ui/react'
import CarContractItem from './components/CarContractItem'

function MyTrip() {
  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Heading p="30px 0">Chuyến của tôi</Heading>
      <Tabs variant="enclosed" w="80%" bg="white" borderRadius="10px">
        <TabList mb="1em">
          <Tab fontWeight="500">Chuyến thuê</Tab>
          <Tab fontWeight="500">Chuyến cho thuê</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              <CarContractItem />
              <CarContractItem />
              <CarContractItem />
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default MyTrip
