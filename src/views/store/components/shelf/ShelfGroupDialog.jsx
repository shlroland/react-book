import React, {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ShelfGroupDialogWrapper } from './style'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { useMoveToGroup, useNewGroup } from './hooks'

const ShelfGroupDialog = (props, ref) => {
  const { isInGroup, category } = props

  const moveToGroup = useMoveToGroup()
  const newGroup = useNewGroup()

  const bookList = useSelector((state) =>
    state.getIn(['bookShelf', 'bookList']).toJS()
  )

  const selectedList = useSelector((state) =>
    state.getIn(['bookShelf', 'selectedList']).toJS()
  )
  const { t } = useTranslation('shelf')
  const [visible, setVisible] = useState(false)
  const [selectGroupDialogVisible, setSelectGroupDialogVisible] = useState(true)
  const [newGroupDialogVisible, setNewGroupDialogVisible] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const dialogInput = useRef(null)

  const defaultCategory = useMemo(() => {
    return [
      {
        title: t('newGroup'),
        edit: 1,
      },
      {
        title: t('groupOut'),
        edit: 2,
      },
    ]
  }, [t])

  const categoryList = useMemo(() => {
    const list = bookList ? bookList.filter((item) => item.type === 2) : []
    return [...defaultCategory, ...list]
  }, [bookList, defaultCategory])

  const hide = useCallback(() => {
    setVisible(false)
    setNewGroupDialogVisible(false)
    setSelectGroupDialogVisible(true)
  }, [])

  const showCreateGroupDialog = useCallback(() => {
    setNewGroupDialogVisible(true)
    setSelectGroupDialogVisible(false)
    setNewGroupName('')
    setTimeout(() => {
      dialogInput.current.focus()
    })
  }, [])

  const onGroupClick = useCallback(
    (item) => {
      if (item.edit && item.edit === 1) {
        showCreateGroupDialog()
      } else if (item.edit && item.edit === 1) {
        hide()
      } else {
        moveToGroup(item)
        hide()
      }
    },
    [hide, moveToGroup, showCreateGroupDialog]
  )

  const createNewGroup = useCallback(() => {
    newGroup({
      id: bookList[bookList.length - 2].id + 1,
      itemList: [...selectedList],
      selected: false,
      title: newGroupName,
      type: 2,
    })
  }, [bookList, newGroup, newGroupName, selectedList])

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide,
  }))

  return (
    <CSSTransition
      in={visible}
      timeout={500}
      classNames="fade"
      appear={true}
      unmountOnExit
    >
      <ShelfGroupDialogWrapper>
        {selectGroupDialogVisible ? (
          <div className="shelf-group-dialog-wrapper">
            <div className="dialog-list">
              <div className="dialog-title-wrapper">
                <span className="dialog-title-text">{t('moveBook')}</span>
              </div>
              <div className="dialog-list-wrapper">
                {categoryList.map((item, index) => {
                  return (
                    <div key={index}>
                      {(item.edit === 2 && isInGroup) ||
                      item.edit !== 2 ||
                      !item.edit ? (
                        <div
                          className={classnames({
                            'dialog-list-item': true,
                            'is-add': item.edit ? item.edit === 1 : false,
                          })}
                          onClick={() => onGroupClick(item)}
                        >
                          <div className="dialog-list-item-text">
                            {item.title}
                          </div>
                          {category && item.id ? (
                            category.id === item.id
                          ) : false ? (
                            <div className="dialog-list-icon-wrapper">
                              <span className="icon-check"></span>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="dialog-btn-wrapper" onClick={() => hide()}>
              <div className="dialog-btn">{t('cancel')}</div>
            </div>
          </div>
        ) : null}
        {newGroupDialogVisible ? (
          <div className="shelf-group-dialog-wrapper">
            <div className="dialog-list">
              <div className="dialog-title-wrapper">
                <span className="dialog-title-text">{t('newGroup')}</span>
              </div>
              <div className="dialog-input-title-wrapper">
                <span className="dialog-input-title">{t('groupName')}</span>
              </div>
              <div className="dialog-input-wrapper">
                <div className="dialog-input-inner-wrapper">
                  <input
                    type="text"
                    className="dialog-input"
                    ref={dialogInput}
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                  <div
                    className="dialog-input-clear-wrapper"
                    style={{
                      display: newGroupName.length > 0 ? 'block' : 'none',
                    }}
                    onClick={() => setNewGroupName('')}
                  >
                    <span className="icon-close-circle-fill"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dialog-btn-wrapper" onClick={() => hide()}>
              <div className="dialog-btn">{t('cancel')}</div>
              <div
                className={classnames({
                  'dialog-btn': true,
                  'is-empty': newGroupName.length === 0,
                })}
                onClick={() => createNewGroup()}
              >
                {t('confirm')}
              </div>
            </div>
          </div>
        ) : null}
      </ShelfGroupDialogWrapper>
    </CSSTransition>
  )
}

export default forwardRef(ShelfGroupDialog)
