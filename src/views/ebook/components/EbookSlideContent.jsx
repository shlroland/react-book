import React, { useState, useCallback } from 'react'
import {
  SlideContentWrapper,
  SlideContentsItemWrapper,
  SlideSearchItemWrapper,
} from '../style'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useGetReadTime } from '../hooks'
import Scroll from '@/common/scroll'
import classnames from 'classnames'
import { useDisplay, useToggleMenuVisible } from '../hooks'
import { changeSection } from '../store/actionCreators'

const SlideContentsItem = ({ label, page, index, level, href }) => {
  const dispatch = useDispatch()
  const section = useSelector((state) => state.getIn(['ebook', 'section']))
  const display = useDisplay()
  const toggleMenuVisible = useToggleMenuVisible()
  const displayCb = () => {
    toggleMenuVisible()
    dispatch(changeSection(index))
  }
  return (
    <SlideContentsItemWrapper
      level={level}
      onClick={() => display(href, false,displayCb)}
    >
      <span
        className={classnames({
          'slide-contents-item-label': true,
          selected: section === index,
        })}
      >
        {label}
      </span>
      <span className="slide-contents-item-page">{page}</span>
    </SlideContentsItemWrapper>
  )
}

const SlideSearchItem = ({ excerpt,cfi }) => {
  const display = useDisplay()
  const toggleMenuVisible = useToggleMenuVisible()
  return <SlideSearchItemWrapper dangerouslySetInnerHTML={{ __html: excerpt }} onClick={()=>display(cfi,true,toggleMenuVisible)}></SlideSearchItemWrapper>
}

const EbookSlideContent = () => {
  const { t } = useTranslation('book')
  const [searchPageVisible, setSearchPageVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [searchList, setSearchList] = useState([])
  const progress = useSelector((state) => state.getIn(['ebook', 'progress']))
  const metadata = useSelector((state) => state.getIn(['ebook', 'metadata']))
  const coverUrl = useSelector((state) => state.getIn(['ebook', 'cover']))
  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )
  const navigation = useSelector((state) =>
    state.getIn(['ebook', 'navigation'])
  )

  const getReadTime = useGetReadTime()

  const searchResult = useCallback(
    async (q) => {
      const results = await Promise.all(
        currentBook.spine.spineItems.map((item) =>
          item
            .load(currentBook.load.bind(currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      )
      return await Promise.resolve([].concat.apply([], results))
    },
    [currentBook]
  )

  const handleSearch = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        searchResult(search).then((res) => {
          setSearchList(
            res.map((item) => {
              item.excerpt = item.excerpt.replace(search,`<span class="content-search-text">${search}</span>`)
              return item
            })
          )
        })
      }
    },
    [search, searchResult]
  )

  return (
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
              onClick={() => setSearchPageVisible(true)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleSearch(e)}
            />
            <input type="text" style={{display:'none'}}/>
          </form>
        </div>
        {searchPageVisible ? (
          <div
            className="slide-contents-search-cancel"
            onClick={() => setSearchPageVisible(false)}
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
          <img className="slide-contents-book-img" src={coverUrl} alt="cover" />
        </div>
        <div className="slide-contents-book-info-wrapper">
          <div className="slide-contents-book-title">
            <span className="slide-contents-book-title-text">
              {metadata.title}
            </span>
          </div>
          <div className="slide-contents-book-author">
            <span className="slide-contents-book-author-text">
              {metadata.creator}
            </span>
          </div>
        </div>
        <div className="slide-contents-book-progress-wrapper">
          <div className="slide-contents-book-progress">
            <span className="progress">{progress + '%'}</span>
            <span className="progress-text">{t('haveRead2')}</span>
          </div>
          <div className="slide-contents-book-time">{getReadTime}</div>
        </div>
      </div>
      <div style={{ display: searchPageVisible ? 'none' : 'block' }}>
        <Scroll className={['slide-contents-list']} top={156} bottom={48}>
          {navigation.map((item, index) => {
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
        </Scroll>
      </div>
      <div style={{ display: !searchPageVisible ? 'none' : 'block' }}>
        <Scroll className={['slide-search-list']} top={66} bottom={48}>
          {searchList.map((item, index) => {
            return (
              <SlideSearchItem
                excerpt={item.excerpt}
                cfi={item.cfi}
                key={index}
              ></SlideSearchItem>
            )
          })}
          {/* <div className="slide-search-item"></div> */}
        </Scroll>
      </div>
    </SlideContentWrapper>
  )
}

export default EbookSlideContent
