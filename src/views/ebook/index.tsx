import React from 'react'
import { useObserver } from 'mobx-react'
import { useStore as useGlobalStore } from '@/store/global'

const Ebook: React.FC = () => {
  const globalStore = useGlobalStore()

  return useObserver(() => <div>{globalStore.fileName}</div>)
}

export default Ebook
