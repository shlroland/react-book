import Mock from 'mockjs'
import BookShelfApi from './bookShelf'

Mock.mock(/\/book\/shelf/, 'get', BookShelfApi)

export default Mock