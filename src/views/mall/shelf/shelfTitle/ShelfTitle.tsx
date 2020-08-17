import React, { FC, memo, useState, useRef } from 'react'
import { ShelfTitleWrapper } from './style'
import { BookList, CategoryItem } from '../types'
import { useObserver, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import { useHistory } from 'react-router-dom'
import Popup, { RefProp } from '@/common/popup/Popup'
import ShelfGroupDialog,{
  RefProp as DialogRefProp,
} from '../shelfGroupDialog/ShelfGroupDialog'

interface ShelfTitleProp {
  title?: string
  data: BookList
  ifShowBack: boolean
  ifShowClear: boolean
  isEditMode: boolean
  category?: CategoryItem
  ifGroupEmpty?: boolean
  ifShowTitle?: boolean
  onEditClick: (v: boolean) => void
  deleteGroup?: ()=>void
  editGroupName?: (name:string)=>void
}

const ShelfTitle: FC<ShelfTitleProp> = (props) => {
  const { t } = useTranslation('shelf')

  const history = useHistory()
  const popupRef = useRef<RefProp | null>(null)
  const dialogRef = useRef<DialogRefProp | null>(null)

  const { data, ifShowTitle,deleteGroup } = props

  const store = useLocalStore((source) => {
    return {
      isDeleteGroup: false,
      get selectedNumber() {
        if (source.category && source.category.itemList) {
          return source.category.itemList.filter((item) => item.selected).length
        } else if (source.data) {
          return source.data.filter((item) => item.selected).length
        } else {
          return 0
        }
      },
      get selectedText() {
        return this.selectedNumber === 0
          ? t('selectBook')
          : this.selectedNumber === 1
          ? t('haveSelectedBook', { $1: this.selectedNumber })
          : t('haveSelectedBooks', { $1: this.selectedNumber })
      },
      get popupTitle() {
        if (this.isDeleteGroup) {
          return t('deleteGroupTitle')
        } else {
          return ''
        }
      },
      get confirmText() {
        if (this.isDeleteGroup) {
          return t('confirm')
        } else {
          return t('deleteGroup')
        }
      },
      get thirdText() {
        if (this.isDeleteGroup) {
          return ''
        } else {
          return t('editGroupName')
        }
      },
      onPopupDelete() {
        if (this.isDeleteGroup) {
          if(deleteGroup) deleteGroup()
          this.isDeleteGroup = false
        } else {
          popupRef.current?.hide()
          setTimeout(() => {
            this.isDeleteGroup = true
            popupRef.current?.show()
          }, 250)
        }
      },
      onPopupChange() {
        source.onEditClick(false)
        dialogRef.current?.show()
        dialogRef.current?.showCreateGroupDialog()
      },
      changeGroup(){
        popupRef.current?.show()
      }
    }
  }, props)

  const [isHideShadow, setIsHideShadow] = useState(true)

  const handleOnEditClick = () => {
    if (props.isEditMode) {
      props.onEditClick(false)
    } else {
      props.onEditClick(true)
    }
  }

  return useObserver(() => (
    <CSSTransition
      in={ifShowTitle}
      timeout={500}
      classNames="fade"
      appear={true}
      unmountOnExit
    >
      <ShelfTitleWrapper className={isHideShadow ? 'hide-shadow' : ''}>
        <div className="title">
          <span className="title-text">{props.title}</span>
          <span
            className="sub-title-text"
            style={{ display: props.isEditMode ? 'inline' : 'none' }}
          >
            {store.selectedText}
          </span>
          {!props.ifGroupEmpty ? (
            <div className="btn-text-wrapper" onClick={handleOnEditClick}>
              <span className="btn-text">
                {props.isEditMode ? t('cancel') : t('edit')}
              </span>
            </div>
          ) : (
            <div className="btn-text-wrapper" onClick={store.changeGroup}>
              <span className="btn-text">{t('editGroup')}</span>
            </div>
          )}
          {props.ifShowClear ? (
            <div className="btn-clear-wrapper">
              <span className="btn-clear">{t('clearCache')}</span>
            </div>
          ) : null}
          {props.ifShowBack && !props.isEditMode ? (
            <div className="btn-back-wrapper" onClick={()=>{
              history.goBack()
            }}>
              <span className="icon-back"></span>
            </div>
          ) : null}
          {props.ifShowBack && props.isEditMode ? (
            <div className="btn-back-wrapper" onClick={store.changeGroup}>
              <span className="btn-text">{t('editGroup')}</span>
            </div>
          ) : null}
        </div>
        <Popup
        ref={popupRef}
        title={store.popupTitle}
        thirdText={store.thirdText}
        confirmText={store.confirmText}
        isRemoveText={true}
        confirm={store.onPopupDelete}
        third={store.onPopupChange}
        cancelText={t('cancel')}
      ></Popup>
      <ShelfGroupDialog
        ref={dialogRef}
        isEditGroupName={true}
        editGroupName={props.editGroupName}
      ></ShelfGroupDialog>
      </ShelfTitleWrapper>
    </CSSTransition>
  ))
}

export default memo(ShelfTitle)
