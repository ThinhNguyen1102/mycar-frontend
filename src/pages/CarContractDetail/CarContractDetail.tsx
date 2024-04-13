import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Heading, HStack, VStack} from '@chakra-ui/react'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import ContractStageProcess from './components/ContractStageProcess'
import ContractInformation from './components/ContractInformation'
import ContractTxHistories from './components/ContractTxHistories'
import {CarContract} from '../../types/api-response.type'
import callApi from '../../utils/api'
import PageLoading from '../../components/PageLoading'
import GlobalLoading from '../../components/GlobalLoading'

function CarContractDetail() {
  const {contractId} = useParams()
  const [contract, setContract] = useState<CarContract | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)

  const carRentalPosts = useCarRentalPostStore(state => state.carRentalPosts)
  const carRentalPost = carRentalPosts.find(
    carRentalPost => carRentalPost.id === Number(contract?.post_id)
  )

  useEffect(() => {
    if (Number.isNaN(contractId)) return

    const getCarContract = async () => {
      const {data: carContract} = await callApi<CarContract>(
        `/api/v1/car-contracts/${contractId}/detail`,
        'GET',
        null
      )

      setContract(carContract)
    }

    getCarContract()
  }, [contractId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      <Heading p="30px 0">Hợp đồng chi tiết</Heading>
      {contract && carRentalPost && (
        <VStack w="80%">
          <ContractStageProcess
            contract={contract}
            setIsLoaded={setIsLoaded}
            setContract={setContract}
          />
          <HStack w="100%" h="100%" borderRadius="10px">
            <ContractInformation carRentalPost={carRentalPost} contract={contract} />
            <ContractTxHistories contract={contract} />
          </HStack>
        </VStack>
      )}
      {(!contract || !carRentalPost) && <PageLoading />}
      {isLoaded && <GlobalLoading message="Đang tạo hợp đồng, vui lòng đợi trong giây lát!!!" />}
    </VStack>
  )
}

export default CarContractDetail
