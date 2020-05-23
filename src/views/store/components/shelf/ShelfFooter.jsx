import React, { useMemo, useState, useRef } from 'react'
import { ShelfFooterWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { useCallback } from 'react'
import Popup from './Popup'
import ShelfGroupDialog from './ShelfGroupDialog'

const ShelfFooter = (props) => {
  const { className,category } = props
  const { t } = useTranslation('shelf')
  const isEditMode = useSelector((state) =>
    state.getIn(['bookShelf', 'isEditMode'])
  )
  const selectedList = useSelector((state) =>
    state.getIn(['bookShelf', 'selectedList']).toJS()
  )
  const [popTitle, setPopTitle] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [isRemoveText, setIsRemoveText] = useState(false)

  const popupRef = useRef(null)

  const isSelected = useMemo(() => {
    if (selectedList.length === 0) {
      return false
    } else {
      return true
    }
  }, [selectedList.length])

  const isPrivate = useMemo(() => {
    if (!isSelected) {
      return false
    } else {
      selectedList.every((item) => {
        return item.private
      })
    }
  }, [isSelected, selectedList])

  const isDownload = useMemo(() => {
    if (!isSelected) {
      return false
    } else {
      selectedList.every((item) => {
        return item.cache
      })
    }
  }, [isSelected, selectedList])

  const tabs = useMemo(() => {
    return [
      {
        label: t('private'),
        label2: t('noPrivate'),
        index: 1,
      },
      {
        label: t('download'),
        label2: t('delete'),
        index: 2,
      },
      {
        label: t('move'),
        index: 3,
      },
      {
        label: t('remove'),
        index: 4,
      },
    ]
  }, [t])

  const label = useCallback(
    (item) => {
      switch (item.index) {
        case 1:
          return isPrivate ? item.label2 : item.label
        case 2:
          return isDownload ? item.label2 : item.label
        default:
          return item.label
      }
    },
    [isDownload, isPrivate]
  )

  const showPopup = useCallback(
    (title, confirmText, onConfirm, isRemoveText = false) => {
      setPopTitle(title)
      setConfirmText(confirmText)
      setIsRemoveText(isRemoveText)
      popupRef.current.show()
    },
    []
  )

  const showPrivate = useCallback(() => {
    if (isSelected) {
      if (!isPrivate) {
        showPopup(t('setPrivateTitle'), t('open'))
      } else {
        showPopup(t('closePrivateTitle'), t('close'))
      }
    }
  }, [isPrivate, isSelected, showPopup, t])

  const showDownload = useCallback(() => {
    if (isSelected) {
        if (!isDownload) {
          showPopup(t('setDownloadTitle'), t('open'))
        } else {
          showPopup(t('removeDownloadTitle'), t('delete'))
        }
      }
  }, [isDownload, isSelected, showPopup, t])

  const showGroupDialog = useCallback(() => {

  }, [])

  const showRemove = useCallback(() => {}, [])

  const onTabClick = useCallback((item) => {
    if (item.index === 1) {
      showPrivate()
    } else if (item.index === 2) {
      showDownload()
    } else if (item.index === 3) {
      showGroupDialog()
    } else if (item.index === 4) {
      showRemove()
    }
  }, [showDownload, showGroupDialog, showPrivate, showRemove])

  return (
    <>
      {isEditMode ? (
        <ShelfFooterWrapper className={className}>
          {tabs.map((item, index) => {
            return (
              <div
                className="book-shelf-tab-wrapper"
                key={index}
                onClick={() => onTabClick(item)}
              >
                <div className="book-shelf-tab">
                  {item.index === 1 && !isPrivate ? (
                    <div
                      className={classnames({
                        'icon-private': true,
                        'tab-icon': true,
                        'is-selected': isSelected,
                      })}
                    ></div>
                  ) : null}
                  {item.index === 1 && isPrivate ? (
                    <div
                      className={classnames({
                        'icon-private-see': true,
                        'tab-icon': true,
                        'is-selected': isSelected,
                      })}
                    ></div>
                  ) : null}
                  {item.index === 2 && !isDownload ? (
                    <div
                      className={classnames({
                        'icon-download': true,
                        'tab-icon': true,
                        'is-selected': isSelected,
                      })}
                    ></div>
                  ) : null}
                  {item.index === 2 && isDownload ? (
                    <div
                      className={classnames({
                        'icon-download-remove': true,
                        'tab-icon': true,
                        'is-selected': isSelected,
                      })}
                    ></div>
                  ) : null}
                  {item.index === 3 ? (
                    <div
                      className={classnames({
                        'icon-move': true,
                        'tab-icon': true,
                        'is-selected': isSelected,
                      })}
                    ></div>
                  ) : null}
                  {item.index === 4 ? (
                    <div
                      className={classnames({
                        'icon-shelf': true,
                        'tab-icon': true,
                        'is-selected': isSelected,
                      })}
                    ></div>
                  ) : null}
                  <div
                    className={classnames({
                      'tab-text': true,
                      'remove-text': item.index === 4,
                      'is-selected': isSelected,
                    })}
                  >
                    {label(item)}
                  </div>
                </div>
              </div>
            )
          })}
          <Popup
            ref={popupRef}
            title={popTitle}
            confirmText={confirmText}
            isRemoveText={isRemoveText}
            cancelText={t('cancel')}
          ></Popup>
          <ShelfGroupDialog category={category}></ShelfGroupDialog>
        </ShelfFooterWrapper>
      ) : null}
    </>
  )
}

export default ShelfFooter
