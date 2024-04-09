import {CarContractStatus} from '../enums/common.enum'
import {UserInfo} from './common.type'

export type CarRentalPost = {
  created_at: Date
  updated_at: Date
  id: number
  owner_id: number
  post_status: string
  model: string
  seats: number
  fuel: string
  consumption: number
  year: number
  description: string
  transmission: string
  brand: string
  license_plate: string
  price_per_day: number
  mortgage: number
  over_limit_fee: number
  over_time_fee: number
  cleaning_fee: number
  deodorization_fee: number
  owner: UserInfo
  carImages: string[]
  carRentalPostAddress: {
    district_name: string
    prefecture_name: string
  }
  carRentalPostFeatures: string[]
}

export type ContractFulfillment = {
  id: number
  has_cleaning_fee: boolean
  has_deodorization_fee: boolean
  has_over_limit_fee: boolean
  has_over_time_fee: boolean
  over_time_hours: number
  other_fee: number
  other_fee_detail: string
}

export type ContractTxHistory = {
  id: number
  tx_hash: string
  tx_type: string
  created_at: Date
}

export type CarContract = {
  id: number
  post_id: number
  owner: UserInfo
  renter: UserInfo
  contractFulfillment: ContractFulfillment | null
  contractTxHistories: ContractTxHistory[]
  contract_status: CarContractStatus
  start_date: Date
  end_date: Date
  renter_wallet_address: string
  owner_wallet_address: string
  car_info_snapshot: string
  price_per_day: number
  mortgage: number
  over_limit_fee: number
  over_time_fee: number
  cleaning_fee: number
  deodorization_fee: number
  num_of_days: number
  created_at: Date
  updated_at: Date
  reviews: any[]
}
