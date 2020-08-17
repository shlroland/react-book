import axios from 'axios'
import { BookItem } from '@/views/mall/shelf/types'
import { getCategoryName } from '@/utils/book'
import { setLocalForage } from '@/utils/localForage'

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SAM_URL}/book/home`,
  })
}

export function detail(book: { fileName: string }) {
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
    url: `${process.env.REACT_APP_SAM_URL}/book/shelf`,
  })
}

export function download(
  item: BookItem,
  onSuccess: (...args: any) => any,
  onFailed: (...args: any) => any,
  onError: (...args: any) => any,
  onProgress?: (...args: any) => any,
) {
  axios
    .create({
      baseURL: process.env.REACT_APP_EPUB_URL,
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
