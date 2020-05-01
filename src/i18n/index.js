import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cn from './cn'
import en from './en'
import { getLocale,saveLocale } from "../utils/localStorage";

const resources = {
  cn,
  en
}

const setLocale = () =>{
  let locale = getLocale()
  if (!locale) {
    locale = 'cn'
    saveLocale(locale)
  }
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
