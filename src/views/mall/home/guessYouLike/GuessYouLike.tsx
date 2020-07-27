import React, { FC, memo } from 'react'
import { GuessYouLikeWrapper } from './style'
import TitleView from '../title/Title'
import { useTranslation } from 'react-i18next'
import { GuessYouLikeItem } from '../types'
import { useObserver, useLocalStore } from 'mobx-react'

interface GuessYouLikeProp {
  data: GuessYouLikeItem[]
}

const GuessYouLike: FC<GuessYouLikeProp> = (prop) => {
  const { t } = useTranslation('home')

  const store = useLocalStore(
    (prop) => ({
      index: 0,
      get total() {
        return prop.data && Math.floor(prop.data.length / 3)
      },
      get showData() {
        if (prop.data.length > 0) {
          return [
            prop.data[store.index],
            prop.data[store.index + store.total],
            prop.data[store.index + store.total * 2],
          ]
        } else {
          return []
        }
      },
      change(){
        if (store.index + 1 >= store.total) {
            store.index = 0
          } else {
            store.index++
          }
      }
    }),
    prop
  )

  const resultText = (item: GuessYouLikeItem) => {
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
  }

  return useObserver(() => (
    <GuessYouLikeWrapper>
      <TitleView
        label={t('guessYouLike')}
        btn={t('change')}
        onChange={store.change}
      ></TitleView>
      <div className="guess-you-like-list">
        {store.showData.length > 0
          ? store.showData.map((item, index) => {
              return (
                <div
                  className="guess-you-like-item"
                  key={item.id}
                  // onClick={() => showBookDetail(item)}
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
            })
          : null}
      </div>
    </GuessYouLikeWrapper>
  ))
}

export default memo(GuessYouLike)
