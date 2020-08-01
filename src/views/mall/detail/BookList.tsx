import React, { FC, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import DetailTitle from './DetailTitle'
import { useLocalStore, useObserver } from 'mobx-react'
import { list as getList } from '@/api'
import qs from 'qs'
import { FeaturedItem } from '../home/types'
import { useTranslation } from 'react-i18next'
import Scroll from '@/common/scroll/Scroll'
import Featured from '../home/featured/Featured'
import { categoryText as getCategoryText, categoryList } from '@/utils/book'

type categoryListItem = keyof typeof categoryList

interface BookListStoreReturn {
  list: {
    [key in categoryListItem]: FeaturedItem[]
  } | null
  total: number
  readonly title: string
  readonly totalNumber: number
  changeList: (
    list: {
      [key in categoryListItem]: FeaturedItem[]
    }
  ) => void
  changeTotal: (total: number) => void
  categoryText: (key: categoryListItem) => string
}

const BookList: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { t } = useTranslation(['category', 'home'])

  const { category, categoryText, keyword } = qs.parse(
    location.search.slice(1, location.search.length)
  )

  const store = useLocalStore<BookListStoreReturn>(() => {
    return {
      list: null,
      total: 0,
      get totalNumber() {
        let num = 0
        if (this.list) {
          Object.keys(this.list).forEach((key) => {
            num += this.list![key as categoryListItem].length
          })
        }
        return num
      },
      get title() {
        if (this.list) {
          return t('home:allBook', { $1: this.totalNumber })
        } else {
          return ''
        }
      },
      categoryText(key) {
        if (key) {
          return `${getCategoryText(categoryList[key], t)}(${
            this.list![key].length
          })`
        } else {
          return ''
        }
      },
      changeList(list) {
        this.list = list
      },
      changeTotal(total) {
        this.total = total
      },
    }
  })

  useEffect(() => {
    getList().then((response) => {
      let list = response.data.data
      const total = response.data.total
      if (category) {
        const key = Object.keys(list).filter((item) => item === category)[0]
        const data = list[key]
        list = {}
        list[key] = data
      } else if (keyword) {
        Object.keys(list).filter((key) => {
          list[key] = list[key].filter(
            (book: any) => book.fileName.indexOf(keyword) >= 0
          )
          return list[key].length > 0
        })
      }
      console.log(list, total)
      store.changeList(list)
      store.changeTotal(total)
    })
  }, [category, keyword, store])

  return useObserver(() => (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
      }}
    >
      <DetailTitle
        title={store.title}
        showShelf={true}
        onBack={history.goBack}
      ></DetailTitle>
      <Scroll top={42}>
        {store.list &&
          Object.keys(store.list).map((key, index) => {
            return (
              <Featured
                data={store.list![key as categoryListItem]}
                titleText={categoryText as string || store.categoryText(key as categoryListItem)}
                btnText="''"
                key="index"
              ></Featured>
            )
          })}
      </Scroll>
    </div>
  ))
}

export default BookList
