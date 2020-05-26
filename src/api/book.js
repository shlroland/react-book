import axios from 'axios'
import { setLocalForage } from '@/utils/localForage'
import { getCategoryName } from '@/utils/book'

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SAM_URL}/book/home`,
  })
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SAM_URL}/book/detail`,
    params: {
      fileName: book.fileName,
    },
  })
}

export function list() {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SAM_URL}/book/list`,
  })
}

export function shelf() {
  return axios({
    method: 'get',
    url: `/book/shelf`,
    // url: './bookShelf.json'
  })
}

export function download(item, onSuccess, onFailed, onError, onProgress) {
  axios
    .create({
      baseURL: process.env.REACT_APP_BOOK_URL,
      method: 'get',
      responseType: 'blob',
      timeout: 360 * 1000,
      onDownloadProgress: (progressEvent) => {
        if (onProgress) onProgress(progressEvent)
      },
    })
    .get(`${getCategoryName(item.category)}/${item.fileName}.epub`)
    .then((res) => {
      const blob = new Blob([res.data])
      setLocalForage(
        item.fileName,
        blob,
        () => {
          if (onSuccess) onSuccess(item)
        },
        (err) => {
          if (onFailed) onFailed(err)
        }
      )
    })
    .catch((err) => {
      if (onError) onError(err)
    })
}
