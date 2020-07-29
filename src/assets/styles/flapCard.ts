import {px2vw} from './index'

// const $firstShowTime = '.3s;'
const $pointShowTime = 1000
// const $bookShowTime = '.3s;'

const $colorGreen = 'rgb(59, 201, 22)'
const $colorPink = 'rgb(255, 102, 159)'
const $colorBlue = 'rgb(74, 171, 255)'
const $colorYellow = 'rgb(255, 198, 102)'
const $colorGreenTransparent = 'rgba(59, 201, 22, .5)'
const $colorPinkTransparent = 'rgba(255, 102, 159, .5)'
const $colorBlueTransparent = 'rgba(74, 171, 255, .5)'
const $colorYellowTransparent = 'rgba(255, 198, 102, .5)'

const $moves = [
  {
    startX: 0,
    startY: 0,
    endX: 15,
    endY: 60,
    width: 4,
    height: 4,
    background: $colorPinkTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 55,
    width: 6,
    height: 6,
    background: $colorGreen,
  },
  {
    startX: 0,
    startY: 0,
    endX: 35,
    endY: 45,
    width: 4,
    height: 4,
    background: $colorBlueTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: 50,
    endY: 25,
    width: 6,
    height: 6,
    background: $colorYellow,
  },
  {
    startX: 0,
    startY: 0,
    endX: 60,
    endY: 0,
    width: 2,
    height: 2,
    background: $colorPinkTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: 50,
    endY: -25,
    width: 6,
    height: 6,
    background: $colorBlue,
  },
  {
    startX: 0,
    startY: 0,
    endX: 40,
    endY: -30,
    width: 3,
    height: 3,
    background: $colorGreenTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: 20,
    endY: -55,
    width: 5,
    height: 5,
    background: $colorPink,
  },
  {
    startX: 0,
    startY: 0,
    endX: 5,
    endY: -45,
    width: 4,
    height: 4,
    background: $colorGreenTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -20,
    endY: -50,
    width: 2,
    height: 2,
    background: $colorPinkTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -40,
    endY: -50,
    width: 2,
    height: 2,
    background: $colorGreenTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -55,
    endY: -30,
    width: 4,
    height: 4,
    background: $colorBlue,
  },
  {
    startX: 0,
    startY: 0,
    endX: -55,
    endY: -10,
    width: 3,
    height: 3,
    background: $colorYellowTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -55,
    endY: -5,
    width: 3,
    height: 3,
    background: $colorGreenTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -35,
    endY: -7,
    width: 2,
    height: 2,
    background: $colorPinkTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -45,
    endY: 10,
    width: 4,
    height: 4,
    background: $colorYellowTransparent,
  },
  {
    startX: 0,
    startY: 0,
    endX: -50,
    endY: 25,
    width: 6,
    height: 6,
    background: $colorPink,
  },
  {
    startX: 0,
    startY: 0,
    endX: -40,
    endY: 35,
    width: 4,
    height: 4,
    background: $colorGreenTransparent,
  },
]

const move = ($index:number) => {
  const $item = $moves[$index]
  const $keyframesName = 'move' + $index
  const $animationTime = $pointShowTime
  const $animationType = 'linear'
  const $animationIterator = 1
  const $width = $item.width
  const $height = $item.height
  const $backgroud = $item.background
  const $startX = $item.startX
  const $startY = $item.startY
  const $endX = $item.endX
  const $endY = $item.endY
  const width = px2vw($width)
  const height = px2vw($height)
  const background = $backgroud
  //    const animation = #{$keyframesName} $animationTime $animationType $animationIterator;
  const animation = {
    id: `#${$keyframesName}`,
    duration: $animationTime,
    easing: $animationType,
    iterations: $animationIterator,
  }
  const keyframe = [
    {
      transform: `translate3d(${px2vw($startX)}, ${px2vw(
        $startY
      )}, 0) scale(0)`,
      opacity: 0,
    },
    {
      transform: `translate3d(${px2vw($endX * 0.5)}, ${px2vw($endY * 0.5)}, 0) scale(0.5)`,
      opacity: 1,
      offset: 0.5,
    },
    {
      transform: `translate3d(${px2vw($endX)}, ${px2vw($endY)}, 0) scale(1)`,
      opacity: 1,
      offset: 0.9,
    },
    {
      transform: `translate3d(${px2vw($endX * 1.05)}, ${px2vw($endY * 1.05)}, 0)
        scale(1)`,
      opacity: 0,
    },
  ]

  return {
    width,
    height,
    background,
    animation,
    keyframe,
  }

}
export default move