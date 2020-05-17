import React, { useMemo, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import qs from 'qs'
import DetailTitle from '../detail/DetailTitle'
import Scroll from '@/common/scroll'
import Featured from '../home/Featured'
import { list as getList } from '@/api/book'
import { categoryText as getCategoryText, categoryList } from '@/utils/book'

const BookList = () => {
  const location = useLocation()
  const history = useHistory()
  const { t } = useTranslation(['category', 'home'])
  const { category, categoryText, keyword } = qs.parse(
    location.search.slice(1, location.search.length)
  )
  const [list, setList] = useState(null)
  const [total, setTotal] = useState(null)

  const totalNumber = useMemo(() => {
    let num = 0
    if (list) {
      Object.keys(list).forEach((key) => {
        num += list[key].length
      })
    }
    return num
  }, [list])

  const title = useMemo(() => {
    if (list) {
      return total && t('home:allBook', { $1: totalNumber })
    } else {
      return null
    }
  }, [list, t, total, totalNumber])

  const handleCategoryText = useMemo(
    (key) => {
      if (key) {
        return `${getCategoryText(categoryList[key], t)}(${list[key].length})`
      } else {
          return ''
      }
    },
    [list, t]
  )

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
            (book) => book.fileName.indexOf(keyword) >= 0
          )
          return list[key].length > 0
        })
      }
      setList(list)
      setTotal(total)
    })
  }, [category, keyword])
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
      }}
    >
      <DetailTitle
        title={title}
        showShelf={true}
        onBack={history.goBack}
      ></DetailTitle>
      <Scroll top={42}>
        {list &&
          Object.keys(list).map((key, index) => {
            return (
              <Featured
                data={list[key]}
                titleText={categoryText || handleCategoryText(key)}
                btnText="''"
                key="index"
              ></Featured>
            )
          })}
      </Scroll>
    </div>
  )
}

export default BookList
