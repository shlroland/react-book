const width = window.innerWidth / 10 > 50 ? 50 : window.innerWidth / 10
export const px2vw = (px:number) => {
  return `${(px / width) * 10}vw`
}
