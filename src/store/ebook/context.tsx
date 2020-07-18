import React, { FC } from 'react'
import Store from './instant'
import { storeType } from './types'
import { useLocalStore } from 'mobx-react'

export const storeContext = React.createContext<storeType | null>(null)

// export const StoreProvider = (childrenFC: FC): FC =>
//   function Comp() {
//     const store = useLocalStore(Store)
//     return (
//       <storeContext.Provider value={store}>{childrenFC}</storeContext.Provider>
//     )
//   }
export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(Store)

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}