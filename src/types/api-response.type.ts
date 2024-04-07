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
