import {ethers} from 'ethers'
import BaseSmartContract from './interfaces/BaseSmartContact'
import MycarAbi from './abis/mycar-abi.json'
// import * as dotenv from 'dotenv'
import {CarContractSM, PayPayloadSM} from '../types/contract.type'
import {CarContractStatus} from '../enums/common.enum'
// dotenv.config({
//   path: path.resolve(__dirname, '..', '..', '.env')
// })

export default class MycarContract extends BaseSmartContract {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.infura.io/v3/b67ddc0d216347899bedfba2b1e50a35'
    )

    super(provider || rpcProvider, '0x3c048c2A7361CE1A6E3efb13B73744c36127eda8', MycarAbi)
    if (!provider) {
      this._contract = new ethers.Contract(this._contractAddress, this._abis, rpcProvider)
    }
  }

  async pay(payload: PayPayloadSM) {
    try {
      const tx = await this._contract.functions.pay(
        payload.contract_id,
        payload.email,
        this._toWei(payload.amount),
        {
          value: this._numberToEth(payload.amount)
        }
      )

      return this._handleTransactionResponse(tx)
    } catch (e) {
      console.log(e)
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
      owner_email: response[1],
      owner_address: response[2],
      renter_email: response[3],
      renter_address: response[4],
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
      status: this.mapContractStatus(response[16]),
      created_at: new Date(this._toNumber(response[17]) * 1000)
    }

    return carContractSm
  }

  private mapContractStatus(status: number): CarContractStatus {
    switch (status) {
      case 0:
        return CarContractStatus.APPROVED
      case 1:
        return CarContractStatus.STARTED
      case 2:
        return CarContractStatus.ENDED
      case 3:
        return CarContractStatus.CANCELED
      default:
        return CarContractStatus.WAITING_APPROVAL
    }
  }
}
