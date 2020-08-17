import React, { FC, useEffect, useRef } from 'react'
import { BookHomeWrapper } from './style'
import SearchBar from './searchBar/SearchBar'
import GuessYouLike from './guessYouLike/GuessYouLike'
import Recommend from './recommend/Recommend'
import Featured from './featured/Featured'
import Scroll from '@/common/scroll/Scroll'
import { useObserver, useLocalStore } from 'mobx-react'
import { getHome, saveHome } from '@/utils/localStorage'
import { home } from '@/api'
import {
  HomeStoreReturn,
  GuessYouLikeItem,
  RecommendItem,
  FeaturedItem,
  CategoryListItem,
  CategoriesItem,
  randomItem,
} from './types'
import { useTranslation } from 'react-i18next'
import CategoryBook from './categoryBook/CategoryBook'
import Category from './category/Category'
import FlapCard, { FlapCardRef } from './flapCard/FlapCard'

const BookHome: FC = () => {
  const { t } = useTranslation()
  const flapCardRef = useRef<FlapCardRef | null>(null)

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
      featuredList: [],
      categoryList: [],
      categoriesList: [],
      randomList: [],
      random: null,
      bannerImage: '',
      showFlapCard: false,
      parseHomeData(data) {
        this.guessYouLikeList = data.guessYouLike as GuessYouLikeItem[]
        this.recommendList = data.recommend as RecommendItem[]
        this.featuredList = data.featured as FeaturedItem[]
        this.categoryList = data.categoryList as CategoryListItem[]
        this.categoriesList = data.categories as CategoriesItem[]
        this.randomList = data.random as randomItem[]
        this.bannerImage = 'url(' + data.banner + ')'
      },
      setShowFlapCard(flag) {
        this.showFlapCard = flag
      },
      toggleShowFlapCard() {
        const randomNumber = Math.floor(Math.random() * this.randomList.length)
        this.random = this.randomList[randomNumber]
        this.showFlapCard = true
        setTimeout(() => {
          flapCardRef.current!.startFlapCardAnimation()
        }, 0)
      },
    }
  })

  useEffect(() => {
    const data = getHome()
    if (data) {
      store.parseHomeData(data)
    } else {
      home().then((res) => {
        if (res.status === 200 && res.data) {
          store.parseHomeData(res.data)
          saveHome(res.data)
        }
      })
    }
  }, [store])

  return useObserver(() => (
    <BookHomeWrapper>
      <SearchBar
        offsetY={store.offsetY}
        handleShowFlapCard={store.toggleShowFlapCard}
      ></SearchBar>
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
          <Featured
            data={store.featuredList}
            titleText={t('home:featured')}
            btnText={t('home:seeAll')}
          ></Featured>
          {store.categoryList &&
            store.categoryList.map((item) => {
              return (
                <div className="category-list-wrapper" key={item.category}>
                  <CategoryBook data={item} key={item.category}></CategoryBook>
                </div>
              )
            })}
          <Category data={store.categoriesList}></Category>
        </div>
      </Scroll>
      {store.showFlapCard ? (
        <FlapCard
          ref={flapCardRef}
          random={store.random!}
          setShowFlapCard={store.setShowFlapCard}
        ></FlapCard>
      ) : null}
    </BookHomeWrapper>
  ))
}

export default BookHome
