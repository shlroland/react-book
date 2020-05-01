import React, { useRef, useCallback } from 'react'
import { ThemeSettingWrapper, ThemeItemWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { genThemeList } from '@/utils/book'
import { saveTheme } from '@/utils/localStorage'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { changeDefaultTheme } from '../store/actionCreators'

const ThemeItem = (props) => {
  const dispatch = useDispatch()
  const { theme } = props

  const defaultTheme = useSelector((state) =>
    state.getIn(['ebook', 'defaultTheme'])
  )

  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))

  const setFontTheme = useCallback(
    (name) => {
      dispatch(changeDefaultTheme(name))
      saveTheme(fileName, name)
      currentBook.rendition.themes.select(defaultTheme)
    },
    [currentBook, defaultTheme, dispatch, fileName]
  )

  return (
    <ThemeItemWrapper onClick={()=>setFontTheme(theme.name)}>
      <div
        className={classnames({
          preview: true,
          selected: defaultTheme === theme.name,
        })}
        style={{ background: theme.style.body.background }}
      ></div>
      <div
        className={classnames({
          text: true,
          selected: defaultTheme === theme.name,
        })}
      >
        {theme.alias}
      </div>
    </ThemeItemWrapper>
  )
}

const EbookSettingTheme = () => {
  const { t } = useTranslation('book')
  const themeList = useRef(genThemeList(t))
  const menuVisible = useSelector((state) =>
    state.getIn(['ebook', 'menuVisible'])
  )
  const settingVisible = useSelector((state) =>
    state.getIn(['ebook', 'settingVisible'])
  )

  return (
    <CSSTransition
      in={menuVisible && settingVisible === 1}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <ThemeSettingWrapper>
        <div className="setting-theme">
          {themeList.current.map((item, index) => (
            <ThemeItem theme={item} key={index}></ThemeItem>
          ))}
        </div>
      </ThemeSettingWrapper>
    </CSSTransition>
  )
}

export default EbookSettingTheme
