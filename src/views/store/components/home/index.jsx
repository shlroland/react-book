import React, { useState, useEffect, useCallback, useRef } from 'react'
import SearchBar from './SearchBar'
import FlapCard from './FlapCard'
import GuessYouLike from './GuessYouLike'
import Scroll from '@/common/scroll'
import { useSelector, useDispatch } from 'react-redux'
import { getHome, saveHome } from '@/utils/localStorage'
import { home } from '@/api/book'
import { changeShowFlapCard, changeRandom } from './store/actionCreators'
import { BookHomeWrapper } from './style'

const BookHome = () => {
  const dispatch = useDispatch()
  const [offsetY, setOffsetY] = useState(0)
  const [height, setHeight] = useState(94)
  const [bannerStyle, setBannerStyle] = useState(null)
  const [randomList, setRandomList] = useState(null)
  const [guessYouLikeList, setGuessYouLikeList] = useState(null);
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
      </Scroll>
      {showFlapCard ? <FlapCard ref={flapCardRef}></FlapCard> : null}
    </BookHomeWrapper>
  )
}

export default BookHome
