import React from 'react'
import { Route } from 'react-router-dom'
import EbookReader from './components/EbookReader'
import EbookTitle from './components/EbookTitle'
import EbookMenu from './components/EbookMenu'
import ThemeContext from './Context'
import { ThemeProvider } from 'styled-components'
import { genGlobalThemeList } from '@/utils/book'
const Ebook = () => {
  const [initTheme, setInitTheme] = React.useState(genGlobalThemeList())

  return (
    <ThemeContext.Provider value={{ initTheme, setInitTheme }}>
      <ThemeProvider theme={initTheme}>
        <EbookTitle></EbookTitle>
        <Route path="/ebook/:fileName" component={EbookReader}></Route>
        <EbookMenu></EbookMenu>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default Ebook
