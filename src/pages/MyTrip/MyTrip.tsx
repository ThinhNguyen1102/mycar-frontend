import {
  Heading,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react'
import CarContractItem from './components/CarContractItem'
import {useEffect, useState} from 'react'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import useUserLoginInfoStore from '../../hooks/user-login-info.store'
import {Link} from 'react-router-dom'
import {CarContract, CarRentalPost} from '../../types/api-response.type'
import callApi from '../../utils/api'
import _ from 'lodash'
import {useShallow} from 'zustand/react/shallow'

function MyTrip() {
  const [ownerCarContracts, setOwnerCarContracts] = useState<CarContract[] | undefined>()
  const [renterCarContracts, setRenterCarContracts] = useState<CarContract[] | undefined>()
  const [isLoadeding, setIsLoadeding] = useState(true)

  const carRentalPosts = useCarRentalPostStore(
    state => state.carRentalPosts,
    (a: CarRentalPost[], b: CarRentalPost[]) => _.isEqual(a, b)
  )
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!userInfo) return

    setIsLoadeding(true)
    const fetchCarContracts = async () => {
      const {data: carContracts} = await callApi<CarContract[]>(
        `/api/v1/car-contracts`,
        'GET',
        null
      )

      setOwnerCarContracts(carContracts.filter(carContract => carContract.owner.id === userInfo.id))
      setRenterCarContracts(
        carContracts.filter(carContract => carContract.renter.id === userInfo.id)
      )
    }

    setIsLoadeding(false)
    fetchCarContracts()
  }, [userInfo])

  console.log('render')

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
            <VStack minH="300px">
              {!isLoadeding &&
                renterCarContracts &&
                renterCarContracts.length > 0 &&
                renterCarContracts.map(carContract => (
                  <CarContractItem
                    key={carContract.id}
                    carContract={carContract}
                    carRentalPost={
                      carRentalPosts.find(post => post.id === carContract.post_id) ?? null
                    }
                  />
                ))}
              {!isLoadeding && renterCarContracts && renterCarContracts.length === 0 && (
                <VStack justifyContent="center">
                  <Text fontSize="20px" fontWeight="500" color="text.gray">
                    Không có chuyến thuê nào!!!
                  </Text>
                  <Link to="/">
                    <Text color="blue.500">Thuê ngay</Text>
                  </Link>
                </VStack>
              )}
              {isLoadeding && (
                <VStack w="100%" h="100%">
                  {[1, 2, 3].map((_, index) => (
                    <Skeleton
                      key={index}
                      startColor="gray.200"
                      endColor="gray.100"
                      borderRadius="10px"
                      height="100px"
                      w="100%"
                    />
                  ))}
                </VStack>
              )}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack minH="300px">
              {!isLoadeding &&
                ownerCarContracts &&
                ownerCarContracts.length > 0 &&
                ownerCarContracts.map(carContract => (
                  <CarContractItem
                    key={carContract.id}
                    carContract={carContract}
                    carRentalPost={
                      carRentalPosts.find(post => post.id === carContract.post_id) ?? null
                    }
                  />
                ))}
              {!isLoadeding && ownerCarContracts && ownerCarContracts.length === 0 && (
                <VStack justifyContent="center">
                  <Text fontSize="20px" fontWeight="500" color="text.gray">
                    Không có chuyến cho thuê nào!!!
                  </Text>
                </VStack>
              )}
              {isLoadeding && (
                <VStack justifyContent="center">
                  {[1, 2, 3].map((_, index) => (
                    <Skeleton
                      key={index}
                      startColor="gray.200"
                      endColor="gray.100"
                      borderRadius="10px"
                      height="100px"
                      w="100%"
                    />
                  ))}
                </VStack>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default MyTrip
