
const width = window.innerWidth / 10 > 50 ? 50 : window.innerWidth / 10

const px2vw = (px) => {
  return `${(px / width) * 10}vw`
}
export default px2vw