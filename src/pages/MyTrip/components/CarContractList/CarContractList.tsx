import {HStack, Icon, Skeleton, Text, VStack} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import useUserLoginInfoStore from '../../../../hooks/user-login-info.store'
import {useShallow} from 'zustand/react/shallow'
import callApi from '../../../../utils/api'
import {CarContract, CarRentalPost, GetCarContractsRes} from '../../../../types/api-response.type'
import CarContractItem from '../CarContractItem'
import useCarRentalPostStore from '../../../../hooks/car-rental-post.store'
import _ from 'lodash'
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'

interface CarContractItemProps {
  isRenterTrips: boolean
}

function CarContractList({isRenterTrips}: CarContractItemProps) {
  const [carContracts, setCarContracts] = useState<CarContract[] | undefined>()
  const [isLoadeding, setIsLoadeding] = useState(true)
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))
  const carRentalPosts = useCarRentalPostStore(
    state => state.carRentalPosts,
    (a: CarRentalPost[], b: CarRentalPost[]) => _.isEqual(a, b)
  )

  const [numOfPages, setNumOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  let arr: number[] = Array.from(Array(numOfPages), (x, index) => index + 1)

  arr = arr.filter(val => {
    if (currentPage > 3 && currentPage < numOfPages - 2) {
      return val >= currentPage - 2 && val <= currentPage + 2
    } else if (currentPage >= numOfPages - 2) {
      return val >= numOfPages - 4
    } else {
      return val <= 5
    }
  })

  useEffect(() => {
    if (!userInfo) return

    setIsLoadeding(true)

    const fetchCarContracts = async () => {
      const {data: carContractsRes} = await callApi<GetCarContractsRes>(
        `/api/v1/car-contracts?type=${isRenterTrips ? 'renter' : 'owner'}&page=${currentPage}&limit=1`,
        'GET',
        null
      )

      setCarContracts(carContractsRes.data)
      setNumOfPages(Math.ceil(carContractsRes.metadata.total / carContractsRes.metadata.limit))
      setIsLoadeding(false)
    }

    fetchCarContracts()
  }, [currentPage, isRenterTrips, userInfo])

  return (
    <VStack minH="300px" p="20px" w="80%" bg="white" borderRadius="10px">
      {!isLoadeding && (
        <HStack gap="15px">
          <Icon
            cursor="pointer"
            fontSize="20px"
            as={IoIosArrowBack}
            color={currentPage === 1 ? 'gray.300' : 'text.primary'}
            onClick={() => {
              if (currentPage > 1) setCurrentPage(currentPage - 1)
            }}
          />
          {!arr.includes(1) && (
            <Text
              cursor="pointer"
              fontWeight="500"
              onClick={() => {
                setCurrentPage(1)
              }}
              color={1 === currentPage ? 'text.primary' : 'gray.300'}
            >
              1
            </Text>
          )}
          {!arr.includes(1) && currentPage > 4 && (
            <Text
              cursor="pointer"
              fontWeight="500"
              onClick={() => {
                if (currentPage > 4) setCurrentPage(currentPage - 3)
              }}
            >
              ...
            </Text>
          )}
          {arr.map((val, index) => {
            return (
              <Text
                key={index}
                cursor="pointer"
                onClick={() => {
                  setCurrentPage(val)
                }}
                fontWeight="500"
                color={val === currentPage ? 'text.primary' : 'gray.300'}
              >
                {val}
              </Text>
            )
          })}
          {!arr.includes(numOfPages) && currentPage < numOfPages - 3 && (
            <Text
              cursor="pointer"
              fontWeight="500"
              onClick={() => {
                if (currentPage < numOfPages - 3) setCurrentPage(currentPage + 3)
              }}
            >
              ...
            </Text>
          )}
          {!arr.includes(numOfPages) && (
            <Text
              cursor="pointer"
              onClick={() => {
                setCurrentPage(numOfPages)
              }}
              fontWeight="500"
              color={numOfPages === currentPage ? 'text.primary' : 'gray.300'}
            >
              {numOfPages}
            </Text>
          )}
          <Icon
            cursor="pointer"
            fontSize="20px"
            color={currentPage === numOfPages ? 'gray.300' : 'text.primary'}
            as={IoIosArrowForward}
            onClick={() => {
              if (currentPage < numOfPages) setCurrentPage(currentPage + 1)
            }}
          />
        </HStack>
      )}
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
    </VStack>
  )
}

export default CarContractList
