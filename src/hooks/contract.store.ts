import {create} from 'zustand'
import MycarContract from '../contract/Mycar.contract'
import {ethers} from 'ethers'

export interface ContractState {
  address: string | null
  balance: number | null
  mycarContract: MycarContract | null
  setWalletInfo: (address: string, balance: number, provider: ethers.providers.Web3Provider) => void
}

const useContractStore = create<ContractState>()(set => ({
  address: null,
  balance: null,
  mycarContract: null,
  setWalletInfo: (address, balance, provider) =>
    set({address, balance, mycarContract: new MycarContract(provider)})
}))

export default useContractStore
