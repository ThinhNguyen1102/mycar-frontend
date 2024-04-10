import {Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from '@chakra-ui/react'
import CarContractItem from './components/CarContractItem'
import {useEffect} from 'react'
import useCarContractStore from '../../hooks/car-contract.store'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import useUserLoginInfoStore from '../../hooks/user-login-info.store'

function MyTrip() {
  const carContracts = useCarContractStore(state => state.carContracts)
  const carRentalPosts = useCarRentalPostStore(state => state.carRentalPosts)
  const userInfo = useUserLoginInfoStore(state => state.userInfo)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Heading p="30px 0">Chuyến của tôi</Heading>
      <Tabs variant="enclosed" w="80%" bg="white" borderRadius="10px">
        <TabList mb="1em" h="60px">
          <Tab fontWeight="500">CHUYẾN THUÊ</Tab>
          <Tab fontWeight="500">CHUYẾN CHO THUÊ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              {carContracts.length > 0 &&
                carContracts
                  .filter(carContract => carContract.renter.id === userInfo?.id)
                  .map(carContract => (
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
            <VStack>
              {carContracts.length > 0 &&
                carContracts
                  .filter(carContract => carContract.owner.id === userInfo?.id)
                  .map(carContract => (
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
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default MyTrip
