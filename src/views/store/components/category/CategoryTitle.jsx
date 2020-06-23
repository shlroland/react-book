import React, { useMemo, useState, useCallback, memo, useRef } from 'react'
import { CategoryTitleWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useEditClick } from './hooks'
import { useHistory } from 'react-router-dom'
import Popup from './Popup'
import { changeIsEditMode } from './store/actionCreators'

const ShelfTitle = ({
  ifShowBack,
  ifShowClear,
  modifyGroupName,
  deleteGroup,
  ifGroupEmpty,
  title,
  category,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('shelf')
  const [isHideShadow, setIsHideShadow] = useState(true)
  const history = useHistory()
  const editClick = useEditClick()

  const [thirdText, setThirdText] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [isRemoveText, setIsRemoveText] = useState(false)

  const popupRef = useRef(null)
  const onConfirm = useRef(null)
  const onThird = useRef(null)

  const isEditMode = useSelector((state) =>
    state.getIn(['bookCategory', 'isEditMode'])
  )
  const data = useSelector((state) =>
    state.getIn(['bookCategory', 'bookList']).toJS()
  )

  const showPopup = useCallback(
    (thirdText, confirmText, confirm, third, isRemoveText = false) => {
      editClick(false)
      setThirdText(thirdText)
      setConfirmText(confirmText)
      setIsRemoveText(isRemoveText)
      onConfirm.current = confirm
      onThird.current = third
      popupRef.current.show()
    },
    [editClick]
  )

  const handleChangeMode = useCallback(() => {
    if (isEditMode) {
      editClick(false)
    } else {
      editClick(true)
    }
  }, [editClick, isEditMode])

  const selectedNumber = useMemo(() => {
    if (category && category.itemList) {
      return category.itemList.filter((item) => item.selected).length
    } else if (data) {
      return data.filter((item) => item.selected).length
    } else {
      return 0
    }
  }, [category, data])

  const selectedText = useMemo(() => {
    return selectedNumber === 0
      ? t('selectBook')
      : selectedNumber === 1
      ? t('haveSelectedBook', { $1: selectedNumber })
      : t('haveSelectedBooks', { $1: selectedNumber })
  }, [selectedNumber, t])

  const handleChangeGroup = useCallback(() => {
    showPopup(
      t('editGroupName'),
      t('deleteGroup'),
      () => {
        deleteGroup()
        dispatch(changeIsEditMode(false))
      },
      () => {
        modifyGroupName()
        dispatch(changeIsEditMode(false))
      },
      true
    )
  }, [deleteGroup, dispatch, modifyGroupName, showPopup, t])

  return (
    <CategoryTitleWrapper className={isHideShadow ? 'hide-shadow' : ''}>
      <div className="title">
        <span className="title-text">{title}</span>
        <span
          className="sub-title-text"
          style={{ display: isEditMode ? 'inline' : 'none' }}
        >
          {selectedText}
        </span>
      </div>
      {!ifGroupEmpty ? (
        <div className="btn-text-wrapper">
          <span className="btn-text" onClick={() => handleChangeMode()}>
            {isEditMode ? t('cancel') : t('edit')}
          </span>
        </div>
      ) : (
        <div className="btn-text-wrapper">
          <span className="btn-text">{t('editGroup')}</span>
        </div>
      )}

      {!isEditMode ? (
        <div className="btn-back-wrapper" onClick={() => history.goBack()}>
          <span className="icon-back"></span>
        </div>
      ) : null}
      {isEditMode ? (
        <div className="btn-back-wrapper">
          <span className="btn-text" onClick={() => handleChangeGroup()}>
            {t('editGroup')}
          </span>
        </div>
      ) : null}
      <Popup
        ref={popupRef}
        thirdText={thirdText}
        confirmText={confirmText}
        isRemoveText={isRemoveText}
        confirm={onConfirm.current}
        third={onThird.current}
        cancelText={t('cancel')}
      ></Popup>
      {/* <popup ref="popup"
               :title="popupTitle"
               :thirdText="thirdText"
               :confirmText="confirmText"
               :isRemoveText="true"
               :cancelText="$t('shelf.cancel')"
               @confirm="onPopupDelete"
               @third="onPopupChange"></popup>
        <shelf-group-dialog :visible.sync="ifGroupDialogShow"
                            :isEditGroupName="true"
                            :category="category"
                            @editGroupName="editGroupName"
                            ref="groupDialog"></shelf-group-dialog> */}
    </CategoryTitleWrapper>
  )
}

export default memo(ShelfTitle)
