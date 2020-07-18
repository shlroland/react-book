import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cn from './cn'
import en from './en'

const resources = {
  cn,
  en
}

const setLocale = () =>{
//   if (!locale) {
   const locale = 'cn'
//   }
  return locale
}

i18n.use(initReactI18next).init({
  resources,
  lng: setLocale(),
  fallbackLng: 'cn',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
