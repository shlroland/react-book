import { getLocalForage,removeLocalForage } from './localForage'
import {  removeLocalStorage } from './localStorage'
import { download } from '../api/book'

export const initBookShelf = (list) => {
  list.forEach((item) => {
    item.selected = false
  })
}

export const appendAddToBookList = (bookList) => {
  bookList.push({
    cover: '',
    title: '',
    type: 3,
    // id: this.bookList[this.bookList.length - 1].id + 1
    id: Number.MAX_SAFE_INTEGER,
  })
}

export const downloadBook = (item,t) => {
  return new Promise((resolve, reject) => {
    getLocalForage(item.fileName, (err, value) => {
      if (!err && value instanceof Blob) {
        console.log(`[${item.fileName}]读取成功...`, value)
        resolve()
      } else {
        download(
          item,
          (item) => {
            console.log('[' + item.fileName + ']下载成功...')
            resolve()
          },
          reject,
          reject,
          // (progressEvent) => {
          //   const progress =
          //     Math.floor((progressEvent.loaded / progressEvent.total) * 100) +
          //     '%'
          //   setToastText(
          //     t('progressDownload', {
          //       $1: `${item.fileName}.epub(${progress})`,
          //     })
          //   )
          // }
        )
      }
    })
  })
}

export function removeBookCache(fileName) {
  return new Promise((resolve, reject) => {
    removeLocalStorage(fileName)
    removeLocalStorage(`${fileName}-info`)
    removeLocalForage(fileName, () => {
      console.log(`[${fileName}]删除成功...`)
      resolve()
    }, reject)
  })
}

