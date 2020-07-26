import React, { FC } from 'react'
import { BookHomeWrapper } from './style'
import SearchBar from './searchBar/SearchBar'
import Scroll from '@/common/scroll/Scroll'
import { useObserver, useLocalStore } from 'mobx-react'

const BookHome: FC = () => {
  // const [offsetY, setOffsetY] = useState(0)
  // const [height, setHeight] = useState(94)

  const store = useLocalStore(()=>{
    return {
      offsetY: 0,
      setOffsetY(offsetY:number){
        this.offsetY = offsetY
      },
      get height () {
        if (store.offsetY > 0) {
          return 52
        } else {
          return 94
        }
      }
    }
  })


  return useObserver(()=>(
    <BookHomeWrapper>
      <SearchBar offsetY={store.offsetY}></SearchBar>
      <Scroll
        top={store.height}
        onScroll={(Y) => store.setOffsetY(Y)}
      >
        <div className="book-list-wrapper"></div>
      </Scroll>
    </BookHomeWrapper>
  )) 
  
}

export default BookHome
