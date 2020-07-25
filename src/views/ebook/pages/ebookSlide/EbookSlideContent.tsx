import React, { FC, memo, useState, KeyboardEvent } from 'react'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import {
  SlideContentWrapper,
  SlideContentsItemWrapper,
  SlideSearchItemWrapper,
} from './style'
import classnames from 'classnames'
import Scroll from '@/common/scroll/Scroll'
import { useTranslation } from 'react-i18next'
import Spine from 'epubjs/types/spine'
import Section from 'epubjs/types/section'
import { Book } from 'epubjs'
import { PackagingMetadataObject } from 'epubjs/types/packaging'
import { useDisplay, useToggleMenuVisible } from '../hooks'

interface EbookSpine extends Spine {
  spineItems: Section[]
}

type EbookLoad = Promise<Document>

interface ContentsItemProp {
  key: string
  label: string
  page: number | undefined
  level: number | undefined
  href: string
  index: number
}

interface SearchItem {
  excerpt: string
  cfi: string
}

const SlideSearchItem: FC<SearchItem> = ({ excerpt, cfi }) => {
  const display = useDisplay()
  const toggleMenuVisible = useToggleMenuVisible()

  const handleDisplay = async () => {
    await display(cfi, true)
    toggleMenuVisible()
  }
  return (
    <SlideSearchItemWrapper
      dangerouslySetInnerHTML={{ __html: excerpt }}
      onClick={handleDisplay}
    ></SlideSearchItemWrapper>
  )
}

const SlideContentsItem: FC<ContentsItemProp> = (props) => {
  const ebookStore = useEbookStore()
  const display = useDisplay()
  const toggleMenuVisible = useToggleMenuVisible()
  const { label, page, index, level, href } = props
  const handleDisplay = async () => {
    await display(href, false)
    toggleMenuVisible()
  }
  return (
    <SlideContentsItemWrapper level={level as number} onClick={handleDisplay}>
      <span
        className={classnames({
          'slide-contents-item-label': true,
          selected: ebookStore.section === index,
        })}
      >
        {label}
      </span>
      <span className="slide-contents-item-page">{page}</span>
    </SlideContentsItemWrapper>
  )
}

const EbookSlideContent: FC = () => {
  const ebookStore = useEbookStore()
  const { t } = useTranslation('book')
  const [searchPageVisible, setSearchPageVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [searchList, setSearchList] = useState<SearchItem[]>([])

  const searchResult = async (q: string) => {
    return Promise.all(
      ((ebookStore.currentBook as Book)
        .spine as EbookSpine).spineItems.map((item) =>
        ((item.load(
          (ebookStore.currentBook as Book).load.bind(
            ebookStore.currentBook as Book
          )
        ) as unknown) as EbookLoad)
          .then(item.find.bind(item, q))
          .finally(item.unload.bind(item))
      )
    ).then((results) =>
      Promise.resolve(([] as any[]).concat.apply([], results))
    )
  }

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      searchResult(search).then((res) => {
        setSearchList(
          res.map((item) => {
            item.excerpt = item.excerpt.replace(
              search,
              `<span class="content-search-text">${search}</span>`
            )
            return item
          })
        )
      })
    }
  }

  return useObserver(() => (
    <SlideContentWrapper>
      <div className="slide-contents-search-wrapper">
        <div className="slide-contents-search-input-wrapper">
          <div className="slide-contents-search-icon">
            <span className="icon-search"></span>
          </div>
          <form action="" style={{ width: '100%' }}>
            <input
              className="slide-contents-search-input"
              type="search"
              placeholder={t('searchHint')}
              value={search}
              onClick={() => setSearchPageVisible(true)}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleSearch(e)}
            />
            <input type="text" style={{ display: 'none' }} />
          </form>
        </div>
        {searchPageVisible ? (
          <div
            className="slide-contents-search-cancel"
            onClick={() => {
              setSearch('')
              setSearchPageVisible(false)
            }}
          >
            {t('cancel')}
          </div>
        ) : null}
      </div>
      <div
        className="slide-contents-book-wrapper"
        style={{ display: searchPageVisible ? 'none' : 'flex' }}
      >
        <div className="slide-contents-book-img-wrapper">
          <img
            className="slide-contents-book-img"
            src={ebookStore.cover}
            alt="cover"
          />
        </div>
        <div className="slide-contents-book-info-wrapper">
          <div className="slide-contents-book-title">
            <span className="slide-contents-book-title-text">
              {(ebookStore.metadata as PackagingMetadataObject).title}
            </span>
          </div>
          <div className="slide-contents-book-author">
            <span className="slide-contents-book-author-text">
              {(ebookStore.metadata as PackagingMetadataObject).creator}
            </span>
          </div>
        </div>
        <div className="slide-contents-book-progress-wrapper">
          <div className="slide-contents-book-progress">
            <span className="progress">{ebookStore.progress + '%'}</span>
            <span className="progress-text">{t('haveRead2')}</span>
          </div>
          <div className="slide-contents-book-time">
            {t('haveRead', { time: ebookStore.readTime })}
          </div>
        </div>
      </div>
      <div style={{ display: searchPageVisible ? 'none' : 'block' }}>
        <Scroll top={156} bottom={48}>
          <div className="slide-contents-list">
            {ebookStore.navigation.map((item, index) => {
              return (
                <SlideContentsItem
                  key={item.id}
                  label={item.label.trim()}
                  page={item.page}
                  level={item.level}
                  href={item.href}
                  index={index}
                ></SlideContentsItem>
              )
            })}
          </div>
        </Scroll>
      </div>
      <div style={{ display: !searchPageVisible ? 'none' : 'block' }}>
        <Scroll top={66} bottom={48}>
          <div className="slide-search-list">
            {searchList.map((item, index) => {
              return (
                <SlideSearchItem
                  excerpt={item.excerpt}
                  cfi={item.cfi}
                  key={index}
                ></SlideSearchItem>
              )
            })}
          </div>
        </Scroll>
      </div>
    </SlideContentWrapper>
  ))
}

export default memo(EbookSlideContent)
