import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BookDetailWrapper } from './style'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import Scroll from '@/common/scroll'
import BookInfo from './BookInfo'
import DetailTitle from './DetailTitle'
import { detail } from '@/api/book'
import { px2vw } from '@assets/style'
import classnames from 'classnames'
import Epub from 'epubjs'

const BookDetail = () => {
  const { fileName } = useParams()
  const {
    state: { category },
  } = useLocation()
  const { t } = useTranslation('detail')
  const history = useHistory()
  const scrollDom = useRef(null)
  const [cover, setCover] = useState('')
  const [opf, setOpf] = useState('')
  const [description, setDescription] = useState('')
  const [metadata, setMetadata] = useState(null)
  const [book, setBook] = useState(null)
  const [navigation, setNavigation] = useState(null)
  const [displayed, setDisplayed] = useState(false)

  const doFlatNavigation = useCallback((content, deep = 1) => {
    const arr = []
    content.forEach((item) => {
      item.deep = deep
      arr.push(item)
      if (item.subitems && item.subitems.length > 0) {
        arr.push(doFlatNavigation(item.subitems, deep + 1))
      }
    })
    return arr
  }, [])

  const title = useMemo(() => {
    return metadata ? metadata.title : ''
  }, [metadata])

  const author = useMemo(() => {
    return metadata ? metadata.creator : '-'
  }, [metadata])

  const publisher = useMemo(() => {
    return metadata ? metadata.publisher : '-'
  }, [metadata])

  const lang = useMemo(() => {
    return metadata ? metadata.language : '-'
  }, [metadata])

  const isbn = useMemo(() => {
    return metadata ? metadata.identifier : '-'
  }, [metadata])

  const flatNavigation = useMemo(() => {
    if (navigation) {
      return Array.prototype.concat.apply(
        [],
        Array.prototype.concat.apply([], doFlatNavigation(navigation.toc))
      )
    } else {
      return []
    }
  }, [doFlatNavigation, navigation])

  const display = useCallback((book, location) => {
    const rendition = book.renderTo('preview', {
      width: window.innerWidth > 640 ? 640 : window.innerWidth,
      height: window.innerHeight,
      method: 'default',
    })
    if (!location) {
      return rendition.display()
    } else {
      return rendition.display(location)
    }
  }, [])

  const readBook = useCallback((e)=>{
    history.push(`/ebook/${category}|${fileName}`)
    e.preventDefault()
    e.stopPropagation()
  },[category, fileName, history])

  const parseBook = useCallback(
    (blob) => {
      const book = new Epub(blob)
      book.loaded.metadata.then((metadata) => {
        setMetadata(metadata)
      })
      book.loaded.navigation.then((nav) => {
        if (nav.toc && nav.toc.length > 1) {
          display(book, nav.toc[1].href).then((section) => {
            if (scrollDom.current) {
              scrollDom.current.refresh()
            }
            setDisplayed(true)
            const reg = new RegExp('<.+?>', 'g')
            const text = section.output
              .replace(reg, '')
              .replace(/\s\s/g, '')
              .substring(0, 100)
            setDescription(text)
          })
        }
        setNavigation(nav)
      })
    },
    [display]
  )

  useEffect(() => {
    if (fileName) {
      detail({ fileName }).then((response) => {
        if (
          response.status === 200 &&
          response.data.error_code === 0 &&
          response.data.data
        ) {
          const data = response.data.data
          setCover(data.cover)
          let rootFile = data.rootFile
          if (rootFile.startsWith('/')) {
            rootFile = rootFile.substring(1, rootFile.length)
          }
          setOpf(
            `${process.env.REACT_APP_EPUB_OPF_URL}/${fileName}/${rootFile}`
          )
          parseBook(
            `${process.env.REACT_APP_EPUB_OPF_URL}/${fileName}/${rootFile}`
          )
        }
      })
    }
  }, [fileName, parseBook])

  return (
    <BookDetailWrapper>
      <DetailTitle showShelf={true} onBack={history.goBack}></DetailTitle>
      <Scroll
        className={['content-wrapper']}
        top={42}
        bottom={43}
        ref={scrollDom}
      >
        <BookInfo
          cover={cover}
          title={title}
          author={author}
          desc={description}
        ></BookInfo>
        <div className="book-detail-content-wrapper">
          <div className="book-detail-content-title">{t('copyright')}</div>
          <div className="book-detail-content-list-wrapper">
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">{t('publisher')}</div>
              <div className="book-detail-content-text">{publisher}</div>
            </div>
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">{t('category')}</div>
              <div className="book-detail-content-text">{category}</div>
            </div>
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">{t('lang')}</div>
              <div className="book-detail-content-text">{lang}</div>
            </div>
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">{t('ISBN')}</div>
              <div className="book-detail-content-text">{isbn}</div>
            </div>
          </div>
        </div>
        <div className="book-detail-content-wrapper">
          <div className="book-detail-content-title">{t('navigation')}</div>
          <div className="book-detail-content-list-wrapper">
            {!flatNavigation ? (
              <div className="loading-text-wrapper">
                <span className="loading-text">{t('loading')}</span>
              </div>
            ) : null}
            <div className="book-detail-content-item-wrapper">
              {flatNavigation.map((item) => {
                return (
                  <div className="book-detail-content-item" key={item.id}>
                    {item.label ? (
                      <div
                        className={classnames({
                          'book-detail-content-navigation-text': true,
                          'is-sub': item.deep > 1,
                        })}
                        style={{
                          marginLeft: px2vw((item.deep - 1) * 20),
                        }}
                      >
                        {item.label}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="book-detail-content-wrapper">
          <div className="book-detail-content-title">{t('trial')}</div>
          <div className="book-detail-content-list-wrapper">
            {!displayed ? (
              <div className="loading-text-wrapper">
                <span className="loading-text">{t('loading')}</span>
              </div>
            ) : null}
          </div>
          <div id="preview"></div>
        </div>
      </Scroll>
      <div className="bottom-wrapper">
        <div className="bottom-btn" onClick={(e)=>readBook(e)}>{t('read')}</div>
        <div className="bottom-btn">{t('listen')}</div>
        <div className="bottom-btn">
          <span className="icon-check"></span>
          {/* {inBookShelf ? t('detail.isAddedToShelf') : t('detail.addOrRemoveShelf')} */}
        </div>
      </div>
      {/* <toast ></toast> */}
    </BookDetailWrapper>
  )
}

export default BookDetail
