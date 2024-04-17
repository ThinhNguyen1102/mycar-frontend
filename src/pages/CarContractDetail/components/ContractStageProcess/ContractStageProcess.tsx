import {Box, Divider, HStack, Spacer, SystemStyleObject, Tag, Text, VStack} from '@chakra-ui/react'
import {CarContract} from '../../../../types/api-response.type'
import useUserLoginInfoStore from '../../../../hooks/user-login-info.store'
import {CarContractStatus} from '../../../../enums/common.enum'
import React from 'react'
import {
  WaitingApprovalStatusOwner,
  WaitingApprovalStatusRenter
} from './components/WaitingApprovalStatus'
import AppovedStatus from './components/ApprovedStatus'
import RejectStatus from './components/RejectStatus'
import CancelStatus from './components/CancelStatus'
import {useShallow} from 'zustand/react/shallow'
import StartStatus from './components/StartStatus'
import EndStatus from './components/EndStatus'

interface ContractStageProcessProps {
  contract: CarContract
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  setContract: React.Dispatch<React.SetStateAction<CarContract | undefined>>
}

function ContractStageProcess({contract, setIsLoaded, setContract}: ContractStageProcessProps) {
  const userInfo = useUserLoginInfoStore(useShallow(state => state.userInfo))

  return (
    <VStack w="100%" bg="white" borderRadius="10px" p="20px">
      <HStack w="100%">
        <Box alignSelf="flex-start" bg="primary.500" p="0 10px" borderRadius="5px">
          <Text color="white" fontSize="18px" fontWeight="500">
            TRẠNG THÁI HỢP ĐỒNG
          </Text>
        </Box>
        <Spacer />
        {contract.is_processing && (
          <Text fontSize="14px" fontWeight="500" color="#f59f00">
            Đang xử lý...
          </Text>
        )}
        {!contract.is_processing && (
          <VStack>
            {contract.contract_status === CarContractStatus.WAITING_APPROVAL && (
              <Tag bg="common.warning" sx={styles.status_tag}>
                Chờ xác nhận
              </Tag>
            )}
            {contract.contract_status === CarContractStatus.REJECTED && (
              <Tag bg="common.error" sx={styles.status_tag}>
                Đã từ chối
              </Tag>
            )}
            {contract.contract_status === CarContractStatus.APPROVED && (
              <Tag bg="common.info" sx={styles.status_tag}>
                Đã xác nhận
              </Tag>
            )}
            {contract.contract_status === CarContractStatus.ENDED && (
              <Tag bg="common.success" sx={styles.status_tag}>
                Đã kết thúc
              </Tag>
            )}
            {contract.contract_status === CarContractStatus.STARTED && (
              <Tag bg="common.info" sx={styles.status_tag}>
                Đã bắt đầu
              </Tag>
            )}
            {contract.contract_status === CarContractStatus.CANCELED && (
              <Tag bg="common.error" sx={styles.status_tag}>
                Đã hủy
              </Tag>
            )}
          </VStack>
        )}
      </HStack>
      <Divider />
      {userInfo?.id === contract.renter.id &&
        contract.contract_status === CarContractStatus.WAITING_APPROVAL && (
          <WaitingApprovalStatusRenter contract={contract} />
        )}
      {userInfo?.id === contract.owner.id &&
        contract.contract_status === CarContractStatus.WAITING_APPROVAL && (
          <WaitingApprovalStatusOwner
            contract={contract}
            setIsLoaded={setIsLoaded}
            setContract={setContract}
          />
        )}
      {contract.contract_status === CarContractStatus.APPROVED && (
        <AppovedStatus contract={contract} setIsLoaded={setIsLoaded} setContract={setContract} />
      )}
      {contract.contract_status === CarContractStatus.REJECTED && <RejectStatus />}
      {contract.contract_status === CarContractStatus.CANCELED && <CancelStatus />}
      {contract.contract_status === CarContractStatus.STARTED && (
        <StartStatus contract={contract} setContract={setContract} setIsLoaded={setIsLoaded} />
      )}
      {contract.contract_status === CarContractStatus.ENDED && <EndStatus />}
    </VStack>
  )
}

type Styles = {
  note: SystemStyleObject
  status_tag: SystemStyleObject
}

const styles: Styles = {
  note: {
    fontSize: '14px',
    color: 'text.gray',
    maxW: '600px',
    textAlign: 'justify'
  },
  status_tag: {
    color: 'white',
    minW: '100px',
    fontSize: '12px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default ContractStageProcess
