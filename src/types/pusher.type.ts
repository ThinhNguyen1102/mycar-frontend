import {CarContractMessageType} from '../enums/common.enum'
import {ContractTxHistory} from './api-response.type'

export type CarContractUpdatePayload = {
  contract_id: number
  type: CarContractMessageType
  tx: ContractTxHistory
}
