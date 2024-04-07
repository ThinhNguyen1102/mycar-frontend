export type UserInfo = {
  id: number
  email: string
  username: string
  phoneNumber: string
}

export type Address = {
  district_name: string
  prefecture_name: string
}

export type ProvinceAPIdata = {
  province_name: string
  province_id: string
  province_type: string
}

export type DistrictAPIdata = {
  district_types: string
  district_name: string
  district_id: string
  province_id: string
}
