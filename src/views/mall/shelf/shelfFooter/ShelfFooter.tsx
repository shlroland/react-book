import React, { FC, memo } from 'react'
import { ShelfFooterWrapper } from './style'
import { BookList } from '../types'
import { useTranslation } from 'react-i18next'
import { useLocalStore } from 'mobx-react'
import { footerTabs } from '@/utils/book'
import classnames from 'classnames'

interface ShelfFooterProp {
  data: BookList
  isInGroup: boolean
  isEditMode: boolean
}

const ShelfFooter: FC<ShelfFooterProp> = (props) => {
  const { t } = useTranslation('shelf')

  const store = useLocalStore(() => ({
    tabs: footerTabs(t),
  }))

  return (
    <ShelfFooterWrapper
      className="book-shelf-footer"
      style={{ display: props.isEditMode ? 'flex' : 'none' }}
    >
      {store.tabs.map((item, index) => {
        return (
          <div
            className="book-shelf-tab-wrapper"
            key={index}
            // onClick={() => onTabClick(item)}
          >
            <div className="book-shelf-tab">
              {/* {item.index === 1 && !isPrivate ? ( */}
              <div
                className={classnames({
                  'icon-private': true,
                  'tab-icon': true,
                  // 'is-selected': isSelected,
                })}
              ></div>
              {/*   ) : null}*/}
              {/* {item.index === 1 && isPrivate ? ( */}
              <div
                className={classnames({
                  'icon-private-see': true,
                  'tab-icon': true,
                  // 'is-selected': isSelected,
                })}
              ></div>
              {/*   ) : null}*/}

              {/* {item.index === 2 && !isDownload ? ( */}
              <div
                className={classnames({
                  'icon-download': true,
                  'tab-icon': true,
                  // 'is-selected': isSelected,
                })}
              ></div>
              {/*   ) : null}*/}

              {/* {item.index === 2 && isDownload ? ( */}
              <div
                className={classnames({
                  'icon-download-remove': true,
                  'tab-icon': true,
                  // 'is-selected': isSelected,
                })}
              ></div>
              {/*   ) : null}*/}
              {item.index === 3 ? (
                <div
                  className={classnames({
                    'icon-move': true,
                    'tab-icon': true,
                    // 'is-selected': isSelected,
                  })}
                ></div>
              ) : null}
              {item.index === 4 ? (
                <div
                  className={classnames({
                    'icon-shelf': true,
                    'tab-icon': true,
                    // 'is-selected': isSelected,
                  })}
                ></div>
              ) : null}
              <div
                className={classnames({
                  'tab-text': true,
                  'remove-text': item.index === 4,
                  //   'is-selected': isSelected,
                })}
              >
                {/* {label(item)} */}
              </div>
            </div>
          </div>
        )
      })}
    </ShelfFooterWrapper>
  )
}

ShelfFooter.defaultProps = {
  isInGroup: false,
}

export default memo(ShelfFooter)
