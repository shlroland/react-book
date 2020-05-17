import React, { useCallback, useMemo, useState } from 'react'
import TitleView from './Title'
import { GuessYouLikeWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const GuessYouLike = ({ data }) => {
  const history = useHistory()
  const { t } = useTranslation('home')
  const [index, setIndex] = useState(0)
  const total = useMemo(() => {
    return data && Math.floor(data.length / 3)
  }, [data])

  const showData = useMemo(() => {
    if (data) {
      return [data[index], data[index + total], data[index + total * 2]]
    } else {
      return []
    }
  }, [data, index, total])
  const showBookDetail = useCallback(
    (book) => {
      history.push(`/book-store/detail/${book.fileName}`, {
        category: book.categoryText,
      })
    },
    [history]
  )
  const resultText = useCallback(
    (item) => {
      if (item && item.type && item.result) {
        switch (item.type) {
          case 1:
            return t('sameAuthor', { result: item.result })
          case 2:
            return t('sameReader', { result: item.result })
          case 3:
            return t('readPercent', {
              result: item.result,
              percent: item.percent,
            })
          default:
            return '暂无显示'
        }
      }
    },
    [t]
  )

  const change = useCallback(() => {
    if (index + 1 >= total) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }, [index, total])

  return (
    <GuessYouLikeWrapper>
      <TitleView
        label={t('guessYouLike')}
        btn={t('change')}
        onChange={change}
      ></TitleView>
      <div className="guess-you-like-list">
        {showData.map((item, index) => {
          return (
            <div
              className="guess-you-like-item"
              key={item.id}
              onClick={() => showBookDetail(item)}
            >
              <div className="img-wrapper">
                <img className="img" src={item.cover} alt="猜你喜欢" />
              </div>
              <div className="content-wrapper">
                <div className="title title-big">{item.title}</div>
                <div className="author sub-title">{item.author}</div>
                <div className="result third-title">{resultText(item)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </GuessYouLikeWrapper>
  )
}

export default GuessYouLike
