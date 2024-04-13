import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Heading, HStack, VStack} from '@chakra-ui/react'
import ContractStageProcess from './components/ContractStageProcess'
import ContractInformation from './components/ContractInformation'
import ContractTxHistories from './components/ContractTxHistories'
import {CarContract, CarRentalPost} from '../../types/api-response.type'
import callApi from '../../utils/api'
import PageLoading from '../../components/PageLoading'
import GlobalLoading from '../../components/GlobalLoading'

function CarContractDetail() {
  const {contractId} = useParams()
  const [contract, setContract] = useState<CarContract | undefined>()
  const [carRentalPost, setCarRentalPost] = useState<CarRentalPost | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)

  console.log('render')

  useEffect(() => {
    if (Number.isNaN(contractId)) return

    const getCarContract = async () => {
      const {data: carContract} = await callApi<CarContract>(
        `/api/v1/car-contracts/${contractId}/detail`,
        'GET',
        null
      )

      const {data: carRentalPost} = await callApi<CarRentalPost>(
        `/api/v1/car-rental-posts/${carContract.post_id}/detail`,
        'GET',
        null
      )

      setContract(carContract)
      setCarRentalPost(carRentalPost)
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
