import React, { useMemo, useState, useRef,useCallback } from 'react'
import { CategoryFooterWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import Popup from './Popup'
import Toast from '@/common/toast'
import ShelfGroupDialog from './ShelfGroupDialog'
import { useSetPrivate, useRemoveBook, useSetDownload } from './hooks'

const ShelfFooter = (props) => {
  const { className, category } = props
  const { t } = useTranslation('shelf')
  const isEditMode = useSelector((state) =>
    state.getIn(['bookCategory', 'isEditMode'])
  )
  const selectedList = useSelector((state) =>
    state.getIn(['bookCategory', 'selectedList']).toJS()
  )

  const [popTitle, setPopTitle] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [isRemoveText, setIsRemoveText] = useState(false)
  const [toastText, setToastText] = useState('')

  const popupRef = useRef(null)
  const dialogRef = useRef(null)
  const toastRef = useRef(null)
  const onConfirm = useRef(null)

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
      return selectedList.every((item) => {
        return item.private
      })
    }
  }, [isSelected, selectedList])

  const isDownload = useMemo(() => {
    if (!isSelected) {
      return false
    } else {
      return selectedList.every((item) => {
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

  const showToast = useCallback((text) => {
    setToastText(text)
    toastRef.current.show()
  }, [])

  const showContinueToast = useCallback((text)=>{
      setToastText(text)
      toastRef.current.continueShow()
  },[])

  const hideToast = useCallback(()=>{
    toastRef.current.hide()
  },[])

  const showPopup = useCallback(
    (title, confirmText, confirm, isRemoveText = false) => {
      setPopTitle(title)
      setConfirmText(confirmText)
      setIsRemoveText(isRemoveText)
      onConfirm.current = confirm
      popupRef.current.show()
    },
    []
  )
  const setPrivate = useSetPrivate(showToast, t)
  const removeBook = useRemoveBook()
  const setDownload = useSetDownload(showToast, showContinueToast, hideToast, t,setToastText)

  const showPrivate = useCallback(() => {
    if (isSelected) {
      if (!isPrivate) {
        showPopup(t('setPrivateTitle'), t('open'), () => {
          setPrivate(true)
        })
      } else {
        showPopup(t('closePrivateTitle'), t('close'), () => {
          setPrivate(false)
        })
      }
    }
  }, [isPrivate, isSelected, setPrivate, showPopup, t])

  const showDownload = useCallback(() => {
    if (isSelected) {
      if (!isDownload) {
        showPopup(t('setDownloadTitle'), t('open'),() => {
          setDownload(true)
        })
      } else {
        showPopup(t('removeDownloadTitle'), t('delete'),() => {
          setDownload(false)
        })
      }
    }
  }, [isDownload, isSelected, setDownload, showPopup, t])

  const showGroupDialog = useCallback(() => {
    if (isSelected) {
      dialogRef.current.show()
    }
  }, [isSelected])

  const showRemove = useCallback(() => {
    if (isSelected) {
      let msg
      if (selectedList.length === 1) {
        msg = t('removeBookTitle', { $1: `《${selectedList[0].title}》` })
      } else {
        msg = t('removeBookTitle', { $1: t('selectedBooks') })
      }
      showPopup(msg, t('removeBook'), removeBook, true)
    }
  }, [isSelected, removeBook, selectedList, showPopup, t])

  const onTabClick = useCallback(
    (item) => {
      if (item.index === 1) {
        showPrivate()
      } else if (item.index === 2) {
        showDownload()
      } else if (item.index === 3) {
        showGroupDialog()
      } else if (item.index === 4) {
        showRemove()
      }
    },
    [showDownload, showGroupDialog, showPrivate, showRemove]
  )

  return (
    <CategoryFooterWrapper
      className={className}
      style={{ display: isEditMode ? 'flex' : 'none' }}
    >
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
        confirm={onConfirm.current}
        cancelText={t('cancel')}
      ></Popup>
      <ShelfGroupDialog ref={dialogRef} category={category}></ShelfGroupDialog>
      <Toast text={toastText} ref={toastRef}></Toast>
    </CategoryFooterWrapper>
  )
}

export default ShelfFooter
