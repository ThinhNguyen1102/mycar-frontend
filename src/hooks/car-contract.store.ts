import {create} from 'zustand'
import {CarContract} from '../types/api-response.type'

export interface CarContractStage {
  carContracts: CarContract[]
  setCarContracts: (carContracts: CarContract[]) => void
}

const useCarContractStore = create<CarContractStage>()(set => ({
  carContracts: [],
  setCarContracts: (carContracts: CarContract[]) => set({carContracts})
}))

export default useCarContractStore
