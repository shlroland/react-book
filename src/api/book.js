import axios from 'axios'

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/book/home`,
  })
}
