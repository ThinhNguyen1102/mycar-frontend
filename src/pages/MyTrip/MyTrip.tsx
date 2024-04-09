import {Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from '@chakra-ui/react'
import CarContractItem from './components/CarContractItem'
import {useEffect} from 'react'
import useCarContractStore from '../../hooks/car-contract.store'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'

function MyTrip() {
  const carContracts = useCarContractStore(state => state.carContracts)
  const carRentalPosts = useCarRentalPostStore(state => state.carRentalPosts)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
              {carContracts.length > 0 &&
                carContracts.map(carContract => (
                  <CarContractItem
                    key={carContract.id}
                    carContract={carContract}
                    carRentalPost={
                      carRentalPosts.find(post => post.id === carContract.post_id) ?? null
                    }
                  />
                ))}
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
