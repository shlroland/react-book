import Store from './instant'
import { themeProp } from '@/assets/styles/theme'

export interface GlobalStoreReturn {
  theme: themeProp
  setTheme: (themeType: themeType) => void
  [propName: string]: any
}

export type themeType = 'Default' | 'Gold' | 'Eye' | 'Night'

export type storeType = ReturnType<typeof Store>
