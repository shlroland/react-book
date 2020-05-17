import React, { useState, useEffect, useCallback, useRef } from 'react'
import SearchBar from './SearchBar'
import FlapCard from './FlapCard'
import GuessYouLike from './GuessYouLike'
import Recommend from './Recommend'
import Featured from './Featured'
import CategoryBook from './CategoryBook'
import Category from './Category'
import Scroll from '@/common/scroll'
import { useSelector, useDispatch } from 'react-redux'
import { getHome, saveHome } from '@/utils/localStorage'
import { home } from '@/api/book'
import { changeShowFlapCard, changeRandom } from './store/actionCreators'
import { BookHomeWrapper } from './style'
import { useTranslation } from 'react-i18next'

const BookHome = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const [offsetY, setOffsetY] = useState(0)
  const [height, setHeight] = useState(94)
  const [bannerStyle, setBannerStyle] = useState(null)
  const [randomList, setRandomList] = useState(null)
  const [guessYouLikeList, setGuessYouLikeList] = useState(null)
  const [recommendList, setRecommendList] = useState(null)
  const [featuredList, setFeaturedList] = useState(null)
  const [categoryList, setCategoryList] = useState(null)
  const [categoriesList, setCategoriesList] = useState(null);
  const flapCardRef = useRef(null)
  const showFlapCard = useSelector((state) =>
    state.getIn(['bookHome', 'showFlapCard'])
  )

  const handleBookListScroll = (Y) => {
    setOffsetY(Y)
  }

  const handleShowFlapCard = useCallback(() => {
    const randomNumber = parseInt(Math.random() * randomList.length)
    dispatch(changeRandom(randomList[randomNumber]))
    dispatch(changeShowFlapCard(true))
    setTimeout(() => {
      flapCardRef.current.startFlapCardAnimation()
    }, 0)
  }, [dispatch, randomList])

  const parseHomeData = useCallback((data) => {
    setRandomList(data.random)
    setGuessYouLikeList(data.guessYouLike)
    setRecommendList(data.recommend)
    setFeaturedList(data.featured)
    setCategoryList(data.categoryList)
    setCategoriesList(data.categories)
    setBannerStyle({
      backgroundImage: 'url(' + data.banner + ')',
    })
  }, [])

  useEffect(() => {
    if (offsetY > 0) {
      setHeight(52)
    } else {
      setHeight(94)
    }
  }, [offsetY])

  useEffect(() => {
    const data = getHome()
    if (data) {
      parseHomeData(data)
    } else {
      home().then((res) => {
        if (res.status === 200 && res.data) {
          parseHomeData(res.data)
          saveHome(res.data)
        }
      })
    }
  }, [parseHomeData])

  return (
    <BookHomeWrapper>
      <SearchBar
        offsetY={offsetY}
        handleShowFlapCard={handleShowFlapCard}
      ></SearchBar>
      <Scroll
        top={height}
        onScroll={(Y) => handleBookListScroll(Y)}
        className={['book-list-wrapper']}
      >
        <div className="banner-wrapper">
          <div className="banner" style={bannerStyle}></div>
        </div>
        <GuessYouLike data={guessYouLikeList}></GuessYouLike>
        <Recommend data={recommendList}></Recommend>
        <Featured data={featuredList} titleText={t('home:featured')} btnText={t('home:seeAll')}></Featured>
        {categoryList &&
          categoryList.map((item) => {
            return (
              <div className="category-list-wrapper" key={item.category}>
                <CategoryBook data={item} key={item.category}></CategoryBook>
              </div>
            )
          })}
          <Category data={categoriesList}></Category>
      </Scroll>
      {showFlapCard ? <FlapCard ref={flapCardRef}></FlapCard> : null}
    </BookHomeWrapper>
  )
}

export default BookHome
