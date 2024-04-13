import {createWithEqualityFn} from 'zustand/traditional'
import {CarRentalPost} from '../types/api-response.type'

export interface CarRentalPostStore {
  carRentalPosts: CarRentalPost[]
  setCarRentalPosts: (carRentalPosts: CarRentalPost[]) => void
}

const useCarRentalPostStore = createWithEqualityFn<CarRentalPostStore>()(set => ({
  carRentalPosts: [],
  setCarRentalPosts: carRentalPosts => set({carRentalPosts})
}))

export default useCarRentalPostStore
