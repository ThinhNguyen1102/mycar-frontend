import {create} from 'zustand'
import {CarRentalPost} from '../types/api-response.type'

export interface CarRentalPostStore {
  carRentalPosts: CarRentalPost[]
  setCarRentalPosts: (carRentalPosts: CarRentalPost[]) => void
}

const useCarRentalPostStore = create<CarRentalPostStore>()(set => ({
  carRentalPosts: [],
  setCarRentalPosts: carRentalPosts => set({carRentalPosts})
}))

export default useCarRentalPostStore
