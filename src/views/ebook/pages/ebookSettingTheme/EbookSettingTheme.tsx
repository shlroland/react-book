import React, { FC, memo } from 'react'
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

export default memo(EbookSettingTheme)
