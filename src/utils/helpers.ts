import {ContractTransactionType} from '../enums/common.enum'
import {CarContract, ContractTxHistory} from '../types/api-response.type'

const REFUND_RATE = 0.25

export const formatTxInfo = (tx: ContractTxHistory, contract: CarContract) => {
  const {mortgage, price_per_day, num_of_days, contractFulfillment} = contract
  const totalPrice = price_per_day * num_of_days
  let totalSurcharge = 0
  if (contractFulfillment) {
    if (contractFulfillment.has_cleaning_fee) totalSurcharge += contract.cleaning_fee
    if (contractFulfillment.has_deodorization_fee) totalSurcharge += contract.deodorization_fee
    if (contractFulfillment.has_over_limit_fee) totalSurcharge += contract.over_limit_fee
    if (contractFulfillment.has_over_time_fee)
      totalSurcharge += contract.over_time_fee * contractFulfillment.over_time_hours
    if (contractFulfillment.other_fee) totalSurcharge += contractFulfillment.other_fee
  }

  const txInfo = {
    content: '',
    time: tx.created_at,
    owner_receive: 0,
    renter_receive: 0,
    value: tx.tx_value
  }

  switch (tx.tx_type) {
    case ContractTransactionType.PAYMENT:
      if (tx.tx_value === totalPrice + mortgage)
        txInfo.content = `Người thuê đã thanh toán ${tx.tx_value} ETH.`
      else txInfo.content = `Chủ xe đã thanh toán ${tx.tx_value} ETH.`
      break
    case ContractTransactionType.CAR_CONTRACT_CREATE:
      txInfo.content = `Hợp đồng đã được tạo.`
      break
    case ContractTransactionType.REFUND_ADMIN_CANCEL:
      txInfo.content = `Hệ thống đã hủy hợp đồng.`
      txInfo.owner_receive = totalPrice * REFUND_RATE
      txInfo.renter_receive = totalPrice + mortgage
      break
    case ContractTransactionType.REFUND_OWNER_REJECT:
      txInfo.content = `Chủ xe đã từ chối tạo hợp đồng.`
      txInfo.renter_receive = totalPrice + mortgage
      break
    case ContractTransactionType.REFUND_OWNER_CANCEL:
      txInfo.content = `Chủ xe đã hủy hợp đồng.`
      txInfo.renter_receive = totalPrice + totalPrice * REFUND_RATE + mortgage
      break
    case ContractTransactionType.REFUND_RENTAL_CANCEL:
      txInfo.content = `Người thuê đã hủy hợp đồng.`
      txInfo.owner_receive = totalPrice * REFUND_RATE * 2
      txInfo.renter_receive = totalPrice + mortgage - totalPrice * REFUND_RATE
      break
    case ContractTransactionType.CAR_CONTRACT_STARTED:
      txInfo.content = `Người thuê đã đã bắt đầu hợp đồng.`
      txInfo.owner_receive = totalPrice * REFUND_RATE
      break
    case ContractTransactionType.CAR_CONTRACT_ENDED:
      txInfo.content = `Chủ xe đã kết thúc hợp đồng.`
      txInfo.owner_receive = totalPrice + totalSurcharge
      txInfo.renter_receive = mortgage - totalSurcharge
      break
  }

  return txInfo
}
