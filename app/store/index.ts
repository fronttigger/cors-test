import { create } from 'zustand'

export const useAccessToken = create<{
  accessToken: string
  setAccessToken: (accessToken: string) => void
}>((set) => ({
  accessToken: '',
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
}))
