import React, {
  memo,
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import { useObserver, useLocalStore } from 'mobx-react'
import { ShelfGroupDialogWrapper } from './style'
import { useTranslation } from 'react-i18next'
import { CategoryItem, BookList, categoryListItem } from '../types'
import classnames from 'classnames'

interface DialogProp {
  isInGroup: boolean
  category?: CategoryItem
  bookList: BookList
  groupEdit: (operation: number, group: categoryListItem) => void
}

export interface RefProp {
  show: () => void
  hide: () => void
}

const ShelfGroupDialog = forwardRef<RefProp, DialogProp>((props, ref) => {
  const { t } = useTranslation('shelf')
  const dialogInput = useRef<HTMLInputElement | null>(null)
  const [newGroupName, setNewGroupName] = useState('')

  const store = useLocalStore((source) => {
    return {
      visible: false,
      newGroupDialogVisible: false,
      selectGroupDialogVisible: true,
      defaultCategory: [
        {
          title: t('newGroup'),
          edit: 1,
        },
        {
          title: t('groupOut'),
          edit: 2,
        },
      ],
      get categoryList() {
        const list = source.bookList
          ? ((source.bookList.filter(
              (item) => item.type === 2
            ) as unknown) as CategoryItem[])
          : []
        return [...this.defaultCategory, ...list] as categoryListItem[]
      },
      onGroupClick(item:categoryListItem) {
        if (item.edit && item.edit === 1) {

        } else if (item.edit && item.edit === 2) {
            // 移出分组
            console.log(2)
            this.hide()
        } else {
            // 移入分组
            props.groupEdit(1,item)
            this.hide()
        }
      },
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      },
    }
  }, props)

  useImperativeHandle(ref, () => ({
    show: store.show,
    hide: store.hide,
  }))

  return useObserver(() => (
    <>
      <CSSTransition
        in={store.visible}
        timeout={500}
        classNames="fade"
        appear={true}
        unmountOnExit
      >
        <ShelfGroupDialogWrapper>
          {store.selectGroupDialogVisible ? (
            <div className="shelf-group-dialog-wrapper">
              <div className="dialog-list">
                <div className="dialog-title-wrapper">
                  <span className="dialog-title-text">{t('moveBook')}</span>
                </div>
                <div className="dialog-list-wrapper">
                  {store.categoryList.map((item, index) => {
                    return (
                      <div key={index}>
                        {(item.edit === 2 && props.isInGroup) ||
                        item.edit !== 2 ||
                        !item.edit ? (
                          <div
                            className={classnames({
                              'dialog-list-item': true,
                              'is-add': item.edit ? item.edit === 1 : false,
                            })}
                            onClick={() => store.onGroupClick(item)}
                          >
                            <div className="dialog-list-item-text">
                              {item.title}
                            </div>
                            {props.category && (item as CategoryItem).id ? (
                              props.category.id === (item as CategoryItem).id
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
              <div className="dialog-btn-wrapper" onClick={() => store.hide()}>
                <div className="dialog-btn">{t('cancel')}</div>
              </div>
            </div>
          ) : null}
          {store.newGroupDialogVisible ? (
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
              <div className="dialog-btn-wrapper" onClick={() => store.hide()}>
                <div className="dialog-btn">{t('cancel')}</div>
                <div
                  className={classnames({
                    'dialog-btn': true,
                    'is-empty': newGroupName.length === 0,
                  })}
                  //   onClick={() => createNewGroup()}
                >
                  {t('confirm')}
                </div>
              </div>
            </div>
          ) : null}
        </ShelfGroupDialogWrapper>
      </CSSTransition>
      {/* <RenderToast></RenderToast> */}
    </>
  ))
})

export default memo(ShelfGroupDialog)
