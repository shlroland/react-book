import React, { memo, FC } from 'react'
import { ShelfWrapper } from './style'
import { useObserver, useLocalStore } from 'mobx-react'
import { BookList } from '../types'

interface ShelfComProp {
  data: BookList
  showType: number
  isEditMode: boolean
}

const ShelfCom: FC<ShelfComProp> = (props) => {

    const store = useLocalStore((source)=>{
        return {
            
        }
    },props)

  return useObserver(() => <ShelfWrapper className="book-shelf-list">
{props.showType === 0 || props.showType === 1 ? ()}
  </ShelfWrapper>)
}

export default memo(ShelfCom)
