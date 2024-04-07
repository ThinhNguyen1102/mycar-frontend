import {ethers} from 'ethers'
import BaseSmartContract from './interfaces/BaseSmartContact'
import MycarAbi from './abis/mycar-abi.json'
// import * as dotenv from 'dotenv'
import {CarContractSM} from '../types/contract.type'
import {appConfig} from '../configs/app.config'
// dotenv.config({
//   path: path.resolve(__dirname, '..', '..', '.env')
// })

export default class MycarContract extends BaseSmartContract {
  constructor(provider?: ethers.providers.Web3Provider) {
    console.log(appConfig)
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.infura.io/v3/b67ddc0d216347899bedfba2b1e50a35'
    )

    super(provider || rpcProvider, '0x708856Cb21c203f5D849073F39E4d36741925559', MycarAbi)
    if (!provider) {
      this._contract = new ethers.Contract(this._contractAddress, this._abis, rpcProvider)
    }
  }

  async getCarContractWithId(contractId: number) {
    try {
      const response = await this._contract.functions.getCarContractWithId(contractId)

      return this.handleListContractResponse(response)
    } catch (e) {
      console.log(e)
    }
  }

  private handleListContractResponse(response: any[]): CarContractSM[] {
    return response.map(r => {
      return this.handleContractResponse(r)
    })
  }

  private handleContractResponse(response: any[]): CarContractSM {
    const carContractSm: CarContractSM = {
      contract_id: this._toNumber(response[0]),
      owner_address: response[1],
      owner_email: response[2],
      renter_address: response[3],
      renter_email: response[4],
      rental_price_per_day: this._toEther(response[5]),
      mortgage: this._toEther(response[6]),
      over_limit_fee: this._toEther(response[7]),
      over_time_fee: this._toEther(response[8]),
      cleaning_fee: this._toEther(response[9]),
      deodorization_fee: this._toEther(response[10]),
      num_of_days: this._toNumber(response[11]),
      start_date: new Date(this._toNumber(response[12])),
      end_date: new Date(this._toNumber(response[13])),
      car_model: response[14],
      car_plate: response[15],
      status: response[16],
      created_at: new Date(this._toNumber(response[17]) * 1000)
    }

    return carContractSm
  }
}
