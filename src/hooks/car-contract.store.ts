import {create} from 'zustand'
import {CarContract} from '../types/api-response.type'

export interface CarContractStage {
  carContracts: CarContract[]
  setCarContracts: (carContracts: CarContract[]) => void
  addCarContract: (carContract: CarContract) => void
}

const useCarContractStore = create<CarContractStage>()(set => ({
  carContracts: [],
  setCarContracts: (carContracts: CarContract[]) => set({carContracts}),
  addCarContract: (carContract: CarContract) =>
    set(state => ({carContracts: [...state.carContracts, carContract]}))
}))

export default useCarContractStore
