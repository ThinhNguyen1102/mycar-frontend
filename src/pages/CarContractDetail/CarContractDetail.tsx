import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useCarContractStore from '../../hooks/car-contract.store'
import {Heading, HStack, VStack} from '@chakra-ui/react'
import useCarRentalPostStore from '../../hooks/car-rental-post.store'
import ContractStageProcess from './components/ContractStageProcess'
import ContractInformation from './components/ContractInformation'
import ContractTxHistories from './components/ContractTxHistories'

function CarContractDetail() {
  const {contractId} = useParams()

  const carContracts = useCarContractStore(state => state.carContracts)
  const carRentalPosts = useCarRentalPostStore(state => state.carRentalPosts)
  const contract = carContracts.find(contract => contract.id === Number(contractId))
  const carRentalPost = carRentalPosts.find(
    carRentalPost => carRentalPost.id === Number(contract?.post_id)
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // console.log(contract)

  return (
    <VStack p="80px 0" w="calc(100vw - 10px)" bg="background">
      {contract && carRentalPost && (
        <VStack w="80%">
          <Heading p="30px 0">Hợp đồng chi tiết</Heading>
          <ContractStageProcess />
          <HStack w="100%" h="100%" borderRadius="10px">
            <ContractInformation carRentalPost={carRentalPost} contract={contract} />
            <ContractTxHistories contract={contract} />
          </HStack>
        </VStack>
      )}
    </VStack>
  )
}

export default CarContractDetail
