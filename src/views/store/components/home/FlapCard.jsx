import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react'
import { flapCardList } from '@/utils/store'
import { FlapCardWrapper } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { changeShowFlapCard } from './store/actionCreators'
import FirePoints from './FirePoints'
import classnames from 'classnames'
import {categoryText} from '@/utils/book'

const FlapCard = forwardRef((_props, ref) => {
  const dispatch = useDispatch()
  const {t} = useTranslation(['category','home'])
  const [showFlapCardAnimation, setShowFlapCardAnimation] = useState(true)
  const [showBookCard, setShowBookCard] = useState(false)
  const [showFirePoints, setShowFirePoints] = useState(true)
  const [runFlapCardAnimation, setRunFlapCardAnimation] = useState(false)
  const [runBookCardAnimation, setRunBookCardAnimation] = useState(false)
  const cardsRef = useRef([])
  const leftItemsRef = useRef([])
  const rightItemsRef = useRef([])
  const frontRef = useRef(0)
  const backRef = useRef(1)
  const FlapCardAnimationTask = useRef(null)

  const random = useSelector((state) =>
    state.getIn(['bookHome', 'random'])
  ).toJS()

  useImperativeHandle(ref, () => ({
    startFlapCardAnimation() {
      setRunFlapCardAnimation(true)
    },
  }))

  const semiCircleStyle = useCallback((item, direction) => {
    return {
      backgroundColor: `rgb(${item.r} ,${item.g} ,${item.b})`,
      backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight,
      backgroundSize: item.backgroundSize,
    }
  }, [])

  const rotate = useCallback((item, dom) => {
    dom.style.transform = `rotateY(${item.rotateDegree}deg)`
    dom.style.backgroundColor = `rgb(${item.r} ,${item._g} ,${item.b})`
  }, [])

  const prepare = useCallback(() => {
    const front = frontRef.current
    const back = backRef.current
    const backFlapCard = flapCardList[back]
    const backLeftSemiCircle = leftItemsRef.current[back]
    const len = flapCardList.length
    flapCardList.forEach((item, index) => {
      cardsRef.current[index].style.zIndex = 100 - ((index - front + len) % len)
    })
    backFlapCard.rotateDegree = 180
    backFlapCard._g = backFlapCard.g - 5 * 9
    rotate(backFlapCard, backLeftSemiCircle)
  }, [rotate])

  const reset = useCallback(() => {
    const front = frontRef.current
    const back = backRef.current
    const frontFlapCard = flapCardList[front]
    const backFlapCard = flapCardList[back]
    const frontRightSemiCircle = rightItemsRef.current[front]
    const backLeftSemiCircle = leftItemsRef.current[back]
    frontFlapCard.rotateDegree = 0
    backFlapCard.rotateDegree = 0
    frontFlapCard._g = frontFlapCard.g
    backFlapCard._g = backFlapCard.g
    rotate(frontFlapCard, frontRightSemiCircle)
    rotate(backFlapCard, backLeftSemiCircle)
    frontRef.current++
    backRef.current++
    if (frontRef.current >= flapCardList.length) {
      frontRef.current = 0
    }
    if (backRef.current >= flapCardList.length) {
      backRef.current = 0
    }
    prepare()
  }, [prepare, rotate])

  const rotateSemiCircle = useCallback(() => {
    const front = frontRef.current
    const back = backRef.current
    const frontFlapCard = flapCardList[front]
    const backFlapCard = flapCardList[back]
    const frontRightSemiCircle = rightItemsRef.current[front]
    const backLeftSemiCircle = leftItemsRef.current[back]
    frontFlapCard.rotateDegree += 10
    backFlapCard.rotateDegree -= 10
    if (frontFlapCard.rotateDegree < 90) {
      frontFlapCard._g -= 5
    }
    if (backFlapCard.rotateDegree < 90) {
      backFlapCard._g += 5
    }
    if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
      cardsRef.current[back].style.zIndex += 2
    }
    rotate(frontFlapCard, frontRightSemiCircle)
    rotate(backFlapCard, backLeftSemiCircle)
    if (frontFlapCard.rotateDegree >= 180 && backFlapCard.rotateDegree <= 0) {
      reset()
    }
  }, [reset, rotate])

  const close = useCallback(() => {
    reset()
    dispatch(changeShowFlapCard(false))
    clearInterval(FlapCardAnimationTask.current)
  }, [dispatch, reset])

  useEffect(() => {
    prepare()
    FlapCardAnimationTask.current = setInterval(() => {
      rotateSemiCircle()
    }, 25)
  }, [prepare, rotateSemiCircle])

  useEffect(() => {
    leftItemsRef.current = leftItemsRef.current.slice(0, flapCardList.length)
    rightItemsRef.current = rightItemsRef.current.slice(0, flapCardList.length)
    cardsRef.current = cardsRef.current.slice(0, flapCardList.length)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowFirePoints(false)
    }, 1001)
    setTimeout(() => {
      clearInterval(FlapCardAnimationTask.current)
      setShowFlapCardAnimation(false)
      setShowBookCard(true)
      setRunBookCardAnimation(true)
    }, 2500)
  }, [])
  return (
    <FlapCardWrapper>
      {showFlapCardAnimation ? (
        <div
          className={classnames({
            'flap-card-bg': true,
            animation: runFlapCardAnimation,
          })}
        >
          {flapCardList.map((item, index) => {
            return (
              <div
                className="flap-card"
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="flap-card-semi-circle">
                  <div
                    className="flap-card-semi-circle-left"
                    style={semiCircleStyle(item, 'left')}
                    ref={(el) => (leftItemsRef.current[index] = el)}
                  ></div>
                  <div
                    className="flap-card-semi-circle-right"
                    style={semiCircleStyle(item, 'right')}
                    ref={(el) => (rightItemsRef.current[index] = el)}
                  ></div>
                </div>
              </div>
            )
          })}
          {showFirePoints ? <FirePoints></FirePoints> : null}
        </div>
      ) : null}
      {showBookCard ? (
        <div
          className={classnames({
            'book-card': true,
            animation: runBookCardAnimation,
          })}
        >
          <div className="book-card-wrapper">
            <div className="img-wrapper">
              <img className="img" alt="#" src={random.cover}/>
            </div>
            <div className="content-wrapper">
              <div className="title">{random.title}</div>
              <div className="author sub-title-medium">{random.author}</div>
              <div className="category">{categoryText(random.category,t)}</div>
            </div>
            <div className="read-btn">{t('home:readNow')}</div>
          </div>
        </div>
      ) : null}
      <div className="close-btn-wrapper" onClick={() => close()}>
        <span className="icon-close"></span>
      </div>
    </FlapCardWrapper>
  )
})

export default memo(FlapCard)
