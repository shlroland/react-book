import React, { FC, useEffect, useCallback } from 'react'
import { BookDetailWrapper } from './style'
import BookInfo from './BookInfo'
import Scroll from '@/common/scroll/Scroll'
import { useTranslation } from 'react-i18next'
import { useParams, useLocation,useHistory } from 'react-router-dom'
import { detail } from '@/api'
import { useLocalStore, useObserver } from 'mobx-react'
import Epub, { Book } from 'epubjs'
import { PackagingMetadataObject } from 'epubjs/types/packaging'
import Section from 'epubjs/types/section'
import Navigation, { NavItem } from 'epubjs/types/navigation'
import classnames from 'classnames'
import { px2vw } from '@/assets/styles'
import DetailTitle from './DetailTitle'
// class BookNavigation extn Navigation {}

interface BookDetailStore {
  metadata: PackagingMetadataObject
  displayed: boolean
  description: string
  cover: string
  navigation: Navigation | null
  readonly title: string
  readonly author: string
  readonly publisher: string
  readonly lang: string
  readonly isbn: string
  readonly flatNavigation: any
  parseBook: (blob: string) => void
  setCover: (cover: string) => void
}

const BookDetail: FC = () => {
  const { fileName } = useParams()
  const {
    state: { category },
  } = useLocation()

  const history = useHistory()

  const { t } = useTranslation('detail')

  const display = useCallback((book: Book, location: string) => {
    const rendition = book.renderTo('preview', {
      width: window.innerWidth > 640 ? 640 : window.innerWidth,
      height: window.innerHeight,
    })
    if (!location) {
      return (rendition.display() as unknown) as Promise<Section>
    } else {
      return (rendition.display(location) as unknown) as Promise<Section>
    }
  }, [])

  const store = useLocalStore<BookDetailStore>(() => {
    return {
      metadata: {
        title: '',
        creator: '',
        description: '-',
        pubdate: '',
        publisher: '-',
        identifier: '-',
        language: '-',
        rights: '-',
        modified_date: '',
        layout: '',
        orientation: '',
        flow: '',
        viewport: '',
        spread: '',
      },
      displayed: false,
      description: '',
      cover: '',
      navigation: null,
      setCover(cover) {
        this.cover = cover
      },
      get title() {
        return this.metadata.title
      },
      get author() {
        return this.metadata.creator
      },
      get publisher() {
        return this.metadata.publisher
      },
      get lang() {
        return this.metadata.language
      },
      get isbn() {
        return this.metadata.identifier
      },
      get flatNavigation() {
        const doFlatNavigation = (content: NavItem[], deep = 1) => {
          const arr: any = []
          content.forEach((item: any) => {
            item.deep = deep
            arr.push(item)
            if (item.subitems && item.subitems.length > 0) {
              arr.push(doFlatNavigation(item.subitems, deep + 1))
            }
          })
          return arr
        }
        if (this.navigation) {
          return Array.prototype.concat.apply(
            [],
            Array.prototype.concat.apply(
              [],
              doFlatNavigation(((this.navigation as unknown) as Navigation).toc)
            )
          )
        } else {
          return []
        }
        // if (this.navigation instanceof Navigation) {
        //     return Array.prototype.concat.apply(
        //         [],
        //         Array.prototype.concat.apply([], doFlatNavigation(this.navigation.toc))
        //     )
        // } else {
        //     return ''
        // }
      },
      parseBook(blob: string) {
        const book = Epub(blob)
        book.loaded.metadata.then((metadata) => {
          this.metadata = metadata
        })
        book.loaded.navigation.then((nav) => {
          if (nav.toc && nav.toc.length > 1) {
            display(book, nav.toc[1].href).then((section) => {
              const reg = new RegExp('<.+?>', 'g')
              const text = section.output
                .replace(reg, '')
                .replace(/\s\s/g, '')
                .substring(0, 100)
              this.displayed = true
              this.description = text
            })
          }
          this.navigation = nav
        })
      },
    }
  })

  useEffect(() => {
    detail({ fileName }).then((response) => {
      if (
        response.status === 200 &&
        response.data.error_code === 0 &&
        response.data.data
      ) {
        const data = response.data.data
        store.setCover(data.cover)
        let rootFile = data.rootFile
        if (rootFile.startsWith('/')) {
          rootFile = rootFile.substring(1, rootFile.length)
        }
        store.parseBook(
          `${process.env.REACT_APP_EPUB_OPF_URL}/${fileName}/${rootFile}`
        )
      }
    })
  }, [fileName, store])

  return useObserver(() => (
    <BookDetailWrapper>
      <DetailTitle showShelf={true} onBack={history.goBack}></DetailTitle>
      <Scroll
        // top={42}
        bottom={43}
        // ref={scrollDom}
      >
        <div className="content-wrapper">
          <BookInfo
            cover={store.cover}
            title={store.title}
            author={store.author}
            desc={store.description}
          ></BookInfo>
          <div className="book-detail-content-wrapper">
            <div className="book-detail-content-title">{t('copyright')}</div>
            <div className="book-detail-content-list-wrapper">
              <div className="book-detail-content-row">
                <div className="book-detail-content-label">
                  {t('publisher')}
                </div>
                <div className="book-detail-content-text">
                  {store.publisher}
                </div>
              </div>
              <div className="book-detail-content-row">
                <div className="book-detail-content-label">{t('category')}</div>
                <div className="book-detail-content-text">{category}</div>
              </div>
              <div className="book-detail-content-row">
                <div className="book-detail-content-label">{t('lang')}</div>
                <div className="book-detail-content-text">{store.lang}</div>
              </div>
              <div className="book-detail-content-row">
                <div className="book-detail-content-label">{t('ISBN')}</div>
                <div className="book-detail-content-text">{store.isbn}</div>
              </div>
            </div>
          </div>
          <div className="book-detail-content-wrapper">
            <div className="book-detail-content-title">{t('navigation')}</div>
            <div className="book-detail-content-list-wrapper">
              {!store.flatNavigation ? (
                <div className="loading-text-wrapper">
                  <span className="loading-text">{t('loading')}</span>
                </div>
              ) : null}
              <div className="book-detail-content-item-wrapper">
                {store.flatNavigation.map((item: any) => {
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
              {!store.displayed ? (
                <div className="loading-text-wrapper">
                  <span className="loading-text">{t('loading')}</span>
                </div>
              ) : null}
            </div>
            <div id="preview"></div>
          </div>
        </div>
      </Scroll>
      <div className="bottom-wrapper">
        <div className="bottom-btn">{t('read')}</div>
        <div className="bottom-btn">{t('listen')}</div>
        <div className="bottom-btn">
          <span className="icon-check"></span>
          {/* {inBookShelf ? t('detail.isAddedToShelf') : t('detail.addOrRemoveShelf')} */}
        </div>
      </div>
      {/* <toast ></toast> */}
    </BookDetailWrapper>
  ))
}

export default BookDetail
