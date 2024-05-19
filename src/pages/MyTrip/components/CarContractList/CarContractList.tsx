import {Divider, Skeleton, Text, VStack} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import useUserLoginInfoStore from '../../../../hooks/user-login-info.store'
import {useShallow} from 'zustand/react/shallow'
import callApi from '../../../../utils/api'
import {CarContract, CarRentalPost, GetCarContractsRes} from '../../../../types/api-response.type'
import CarContractItem from '../CarContractItem'
import useCarRentalPostStore from '../../../../hooks/car-rental-post.store'
import _ from 'lodash'
import Pagination from '../../../../components/Pagination'
import CarContractFilter from '../CarContractFilter'

function CarContractList() {
  const [carContracts, setCarContracts] = useState<CarContract[] | undefined>()
  const [isLoadeding, setIsLoadeding] = useState(true)
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))
  const carRentalPosts = useCarRentalPostStore(
    state => state.carRentalPosts,
    (a: CarRentalPost[], b: CarRentalPost[]) => _.isEqual(a, b)
  )

  const [numOfPages, setNumOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [statuses, setStatuses] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  useEffect(() => {
    if (!userInfo) return

    setIsLoadeding(true)

    const fetchCarContracts = async () => {
      const {data: carContractsRes} = await callApi<GetCarContractsRes>(
        `/api/v1/car-contracts?type=${types.join(';')}&page=${currentPage}&limit=10&status=${statuses.join(';')}`,
        'GET',
        null
      )

      setCarContracts(carContractsRes.data)
      setNumOfPages(Math.ceil(carContractsRes.metadata.total / carContractsRes.metadata.limit))
      setIsLoadeding(false)
    }

    fetchCarContracts()
  }, [currentPage, userInfo, statuses, types])

  return (
    <VStack minH="300px" p="20px" w="80%" bg="white" borderRadius="10px">
      <CarContractFilter
        statuses={statuses}
        setStatuses={setStatuses}
        types={types}
        setTypes={setTypes}
        setCurrentPage={setCurrentPage}
      />
      <Divider w="100%" />
      <Pagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <VStack w="100%" h="100%">
        {!isLoadeding &&
          carContracts &&
          carContracts.length > 0 &&
          carContracts.map(carContract => (
            <CarContractItem
              key={carContract.id}
              carContract={carContract}
              carRentalPost={carRentalPosts.find(post => post.id === carContract.post_id) ?? null}
            />
          ))}
        {!isLoadeding && carContracts && carContracts.length === 0 && (
          <VStack justifyContent="center">
            <Text fontSize="20px" fontWeight="500" color="text.gray">
              Không có chuyến cho thuê nào!!!
            </Text>
          </VStack>
        )}
        {isLoadeding && (
          <VStack justifyContent="center" w="100%">
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
      <Pagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </VStack>
  )
}

export default CarContractList
