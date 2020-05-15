import React, { useState, useEffect,useCallback,useRef } from 'react'
import SearchBar from './SearchBar'
import FlapCard from './FlapCard'
import Scroll from '@/common/scroll'
import { useSelector,useDispatch } from 'react-redux'
import { getHome, saveHome } from '@/utils/localStorage'
import { home } from '@/api/book'
import { changeShowFlapCard, changeRandom } from './store/actionCreators'

const BookHome = () => {
  const dispatch = useDispatch()
  const [offsetY, setOffsetY] = useState(0)
  const [height, setHeight] = useState(94)
  const [randomList, setRandomList] = useState(null);
  const flapCardRef = useRef(null)
  const showFlapCard = useSelector((state) =>
    state.getIn(['bookHome', 'showFlapCard'])
  )

  const handleBookListScroll = (Y) => {
    setOffsetY(Y)
  }

  const handleShowFlapCard = useCallback(()=>{
    const randomNumber = parseInt(Math.random() * randomList.length)
    dispatch(changeRandom(randomList[randomNumber]))
    dispatch(changeShowFlapCard(true))
    setTimeout(()=>{
     flapCardRef.current.startFlapCardAnimation()
    },0)

  },[dispatch, randomList])

  const parseHomeData = useCallback((data)=>{
    setRandomList(data.random)
  },[])



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
      home().then(res=>{
        if (res.status === 200 && res.data) {
          parseHomeData(res.data)
          saveHome(res.data)
        }
      })
    }
  }, [parseHomeData])

  return (
    <>
      <SearchBar offsetY={offsetY} handleShowFlapCard={handleShowFlapCard}></SearchBar>
      <Scroll top={height} onScroll={(Y) => handleBookListScroll(Y)}>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
        <div>12312312223123123123123</div>
      </Scroll>
      {/* <FlapCard style={{display: showFlapCard? 'block' : 'none'}}></FlapCard> */}
      {showFlapCard ? <FlapCard ref={flapCardRef}></FlapCard> : null}
    </>
  )
}

export default BookHome
