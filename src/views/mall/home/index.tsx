import React, { FC, useEffect } from 'react'
import { BookHomeWrapper } from './style'
import SearchBar from './searchBar/SearchBar'
import GuessYouLike from './guessYouLike/GuessYouLike'
import Scroll from '@/common/scroll/Scroll'
import { useObserver, useLocalStore } from 'mobx-react'
import { getHome, saveHome } from '@/utils/localStorage'
import { home } from '@/api'
import { HomeStoreReturn, GuessYouLikeItem } from './types'

const BookHome: FC = () => {
  const store = useLocalStore<HomeStoreReturn>(() => {
    return {
      offsetY: 0,
      setOffsetY(offsetY: number) {
        this.offsetY = offsetY
      },
      get height() {
        if (store.offsetY > 0) {
          return 52
        } else {
          return 94
        }
      },
      guessYouLikeList: [],
      parseHomeData(data) {
        this.guessYouLikeList = data.guessYouLike as GuessYouLikeItem[]
      },
    }
  })

  useEffect(() => {
    const data = getHome()
    if (data) {
      console.log(data)

      store.parseHomeData(data)
    } else {
      home().then((res) => {
        if (res.status === 200 && res.data) {
          console.log(res.data)
          store.parseHomeData(res.data)
          saveHome(res.data)
        }
      })
    }
  }, [store])

  return useObserver(() => (
    <BookHomeWrapper>
      <SearchBar offsetY={store.offsetY}></SearchBar>
      <Scroll top={store.height} onScroll={(Y) => store.setOffsetY(Y)}>
        <div className="book-list-wrapper">
          <div className="banner-wrapper">
            {/* <div className="banner" style={bannerStyle}></div> */}
          </div>
          <GuessYouLike data={store.guessYouLikeList}></GuessYouLike>
        </div>
      </Scroll>
    </BookHomeWrapper>
  ))
}

export default BookHome
