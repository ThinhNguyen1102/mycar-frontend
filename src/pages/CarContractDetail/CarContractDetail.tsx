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
import {pusherClient} from '../../libs/pusher'
import {CarContractUpdatePayload} from '../../types/pusher.type'
import {CarContractMessageType, CarContractStatus} from '../../enums/common.enum'

function CarContractDetail() {
  const {contractId} = useParams()
  const [contract, setContract] = useState<CarContract | undefined>()
  const [carRentalPost, setCarRentalPost] = useState<CarRentalPost | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const updateCarContract = async (status: CarContractStatus, data: CarContractUpdatePayload) => {
    setContract(contract => {
      return contract
        ? {
            ...contract,
            contract_status: status,
            is_processing: false,
            contractTxHistories: [...contract.contractTxHistories, data.tx]
          }
        : undefined
    })
  }

  useEffect(() => {
    if (!contract) return
    if (!contractId) return

    pusherClient.subscribe(`car-contract-${contractId}`)

    pusherClient.bind('car-contract::update', (data: CarContractUpdatePayload) => {
      console.log(data)
      switch (data.type) {
        case CarContractMessageType.CREATE_CAR_CONTRACT:
          updateCarContract(CarContractStatus.APPROVED, data)
          break
        case CarContractMessageType.REFUND_OWNER_REJECTED:
          updateCarContract(CarContractStatus.REJECTED, data)
          break
        case CarContractMessageType.REFUND_OWNER_CANCELED:
          updateCarContract(CarContractStatus.CANCELED, data)
          break
        case CarContractMessageType.REFUND_RENTER_CANCELED:
          updateCarContract(CarContractStatus.CANCELED, data)
          break
        case CarContractMessageType.REFUND_ADMIN_CANCEL:
          updateCarContract(CarContractStatus.CANCELED, data)
          break
        case CarContractMessageType.START_CAR_CONTRACT:
          updateCarContract(CarContractStatus.STARTED, data)
          break
        case CarContractMessageType.END_CAR_CONTRACT:
          updateCarContract(CarContractStatus.ENDED, data)
          break
        default:
      }
    })

    return () => {
      pusherClient.unsubscribe(`car-contract-${contractId}`)
      pusherClient.unbind('car-contract::update')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId, contract, isLoaded])

  useEffect(() => {
    if (Number.isNaN(contractId)) return

    setIsDetailLoading(true)

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

      if (carContract && carRentalPost) {
        setIsDetailLoading(false)
      }

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
      {!isDetailLoading && contract && carRentalPost && (
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
      {isDetailLoading && <PageLoading />}
      {isLoaded && <GlobalLoading message="Đang tạo hợp đồng, vui lòng đợi trong giây lát!!!" />}
    </VStack>
  )
}

export default CarContractDetail
