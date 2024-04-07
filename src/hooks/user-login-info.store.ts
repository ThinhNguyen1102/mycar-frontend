import {create} from 'zustand'
import {UserInfo} from '../types/common.type'

export interface UserLoginInfoState {
  userInfo: UserInfo | null
  accessToken: string | null
  refreshToken: string | null
  setUserInfo: (userInfo: UserInfo) => void
  setToken: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

const useUserLoginInfoStore = create<UserLoginInfoState>()(set => ({
  userInfo: null,
  accessToken: null,
  refreshToken: null,
  setUserInfo: userInfo => set({userInfo}),
  setToken: (accessToken, refreshToken) => set({accessToken, refreshToken}),
  logout: () => set({userInfo: null, accessToken: null, refreshToken: null})
}))

export default useUserLoginInfoStore
