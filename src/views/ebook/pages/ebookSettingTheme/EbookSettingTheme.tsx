import React, { FC } from 'react'
// import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import { useStore as useEbookStore } from '@/store/ebook'
import { useObserver } from 'mobx-react'
import { ThemeSettingWrapper, ThemeItemWrapper } from './style'
import { ebookItemType } from '@/utils/book'
import classnames from 'classnames'
import { themeType } from '@/store/ebook/types'

const ThemeItem: FC<{ theme: ebookItemType }> = (props) => {
  const ebookStore = useEbookStore()

  const { theme } = props

  const setTheme = (name: themeType) => {
    ebookStore.setTheme(name)
  }

  return useObserver(() => (
    <ThemeItemWrapper>
      <div
        className={classnames({
          preview: true,
          selected: ebookStore.ebookTheme === theme.name,
        })}
        style={{ background: theme.background }}
        onClick={() => setTheme(theme.name)}
      ></div>
      <div
        className={classnames({
          text: true,
          selected: ebookStore.ebookTheme === theme.name,
        })}
      >
        {theme.alias}
      </div>
    </ThemeItemWrapper>
  ))
}

const EbookSettingTheme: FC = () => {
  const ebookStore = useEbookStore()
  // const { t } = useTranslation('book')
  // const themeListStore = useLocalStore(() => {
  //   return {
  //     themeList: genThemeList(t),
  //   }
  // })
  // const themeList = useRef(genThemeList(t))
  // const menuVisible = useSelector((state) =>
  //   state.getIn(['ebook', 'menuVisible'])
  // )
  // const settingVisible = useSelector((state) =>
  //   state.getIn(['ebook', 'settingVisible'])
  // )

  return useObserver(() => (
    <CSSTransition
      in={ebookStore.themeSettingVisible}
      timeout={300}
      classNames="slide-up"
      appear={true}
      unmountOnExit
    >
      <ThemeSettingWrapper>
        <div className="setting-theme">
          {(ebookStore.ebookThemeList as ebookItemType[]).map((item, index) => (
            <ThemeItem theme={item} key={index}></ThemeItem>
          ))}
        </div>
      </ThemeSettingWrapper>
    </CSSTransition>
  ))
}

export default EbookSettingTheme
