import axios from 'axios'

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SAM_URL}/book/home`,
  })
}

export function detail(book:{fileName:string}) {
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
  })
}