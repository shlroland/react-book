import React, { useMemo, useState, useCallback, memo } from 'react'
import { ShelfTitleWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useEditClick } from '../../hooks/index'

const ShelfTitle = ({
  ifShowBack,
  ifShowClear,
  ifGroupEmpty,
  title,
  category,
}) => {
  const { t } = useTranslation('shelf')
  const [isHideShadow, setIsHideShadow] = useState(true)

  const editClick = useEditClick()

  const isEditMode = useSelector((state) =>
    state.getIn(['bookShelf', 'isEditMode'])
  )
  const data = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )

  const handleChangeMode = useCallback(() => {
    if (isEditMode) {
      editClick(false)
    }else {
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

  // useBookList().then((res) => {
  //   setData(res)
  // })

  return (
    <ShelfTitleWrapper className={isHideShadow ? 'hide-shadow' : ''}>
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
      {/* {ifGroupEmpty ?  : null} */}
      {/* {isDataEmpty ? (
        <div className="btn-text-wrapper">
          <span className="btn-text">{t('changeLanguage')}</span>
        </div>
      ) : null} */}
      {ifShowClear ? (
        <div className="btn-clear-wrapper">
          <span className="btn-clear">{t('clearCache')}</span>
        </div>
      ) : null}
      {ifShowBack && !isEditMode ? (
        <div className="btn-back-wrapper">
          <span className="icon-back"></span>
        </div>
      ) : null}
      {ifShowBack && isEditMode ? (
        <div className="btn-back-wrapper">
          <span className="btn-text">{t('editGroup')}</span>
        </div>
      ) : null}
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
    </ShelfTitleWrapper>
  )
}

export default memo(ShelfTitle)
