import React, { FC, useEffect } from 'react'
import { BookHomeWrapper } from './style'
import SearchBar from './searchBar/SearchBar'
import GuessYouLike from './guessYouLike/GuessYouLike'
import Recommend from './recommend/Recommend'
import Scroll from '@/common/scroll/Scroll'
import { useObserver, useLocalStore } from 'mobx-react'
import { getHome, saveHome } from '@/utils/localStorage'
import { home } from '@/api'
import { HomeStoreReturn, GuessYouLikeItem, RecommendItem } from './types'

const BookHome: FC = () => {
  const store = useLocalStore<HomeStoreReturn>(() => {
    return {
      offsetY: 0,
      setOffsetY(offsetY: number) {
        this.offsetY = offsetY
      },
      get height() {
        if (store.offsetY > 0) {
          return 94
        } else {
          return 52
        }
      },
      guessYouLikeList: [],
      recommendList: [],
      bannerImage: '',
      parseHomeData(data) {
        this.guessYouLikeList = data.guessYouLike as GuessYouLikeItem[]
        this.recommendList = data.recommend as RecommendItem[]
        this.bannerImage = 'url(' + data.banner + ')'
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
            <div
              className="banner"
              style={{ backgroundImage: store.bannerImage }}
            ></div>
          </div>
          <GuessYouLike data={store.guessYouLikeList}></GuessYouLike>
          <Recommend data={store.recommendList}></Recommend>
        </div>
      </Scroll>
    </BookHomeWrapper>
  ))
}

export default BookHome
