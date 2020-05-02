import React, { useRef, useCallback, useContext } from 'react'
import { ThemeSettingWrapper, ThemeItemWrapper } from '../style'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { genThemeList } from '@/utils/book'
import { saveTheme } from '@/utils/localStorage'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { changeDefaultTheme } from '../store/actionCreators'
import ThemeContext from '../Context'
import { genGlobalThemeList } from '@/utils/book'

const ThemeItem = (props) => {
  const dispatch = useDispatch()
  const { setInitTheme } = useContext(ThemeContext)

  const { theme } = props

  const defaultTheme = useSelector((state) =>
    state.getIn(['ebook', 'defaultTheme'])
  )

  const currentBook = useSelector((state) =>
    state.getIn(['ebook', 'currentBook'])
  )

  const fileName = useSelector((state) => state.getIn(['ebook', 'fileName']))

  const setTheme = useCallback(
    (name) => {
      dispatch(changeDefaultTheme(name))
      saveTheme(fileName, name)
      currentBook.rendition.themes.select(name)
      setInitTheme(genGlobalThemeList(name))
    },
    [currentBook, dispatch, fileName, setInitTheme]
  )

  return (
    <ThemeItemWrapper onClick={() => setTheme(theme.name)}>
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
