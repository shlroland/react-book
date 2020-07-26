import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function getLocalStorage(key: any) {
  return localStorage.get(key)
}

export function setLocalStorage(
  key: any,
  value: any,
  expire = 365 * 24 * 3600
) {
  return localStorage.set(key, value, { exp: expire })
}

export function removeLocalStorage(key: any) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function getBookObject(fileName: string, key: any) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key]
  } else {
    return null
  }
}

export function setBookObject(fileName: string, key: any, value: any) {
  let book: any = {}
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`)
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getFontFamily(fileName: string) {
  return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily(fileName: string, fontFamily: string) {
  setBookObject(fileName, 'fontFamily', fontFamily)
}

export function getMetadata(fileName: string) {
  return getBookObject(fileName, 'metadata')
}

export function saveMetadata(fileName: string, metadata:object) {
  setBookObject(fileName, 'metadata', metadata)
}

export function getFontSize(fileName: string) {
  return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName: string, fontSize: number) {
  setBookObject(fileName, 'fontSize', fontSize)
}

export function getLocale() {
  return getLocalStorage('locale')
}

export function saveLocale(locale: 'cn' | 'en') {
  return setLocalStorage('locale', locale)
}

export function getTheme(fileName: string) {
  return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName: string, theme: string) {
  setBookObject(fileName, 'theme', theme)
}

export function getReadTime(fileName: string) {
  return getBookObject(fileName, 'time')
}

export function saveReadTime(fileName: string, time: number) {
  setBookObject(fileName, 'time', time)
}

export function getProgress(fileName: string) {
  return getBookObject(fileName, 'progress')
}

export function saveProgress(fileName: string, progress: number) {
  setBookObject(fileName, 'progress', progress)
}

export function getLocation(fileName: string) {
  return getBookObject(fileName, 'location')
}

export function saveLocation(fileName: string, location: string) {
  setBookObject(fileName, 'location', location)
}

export function getBookmark(fileName: string) {
  return getBookObject(fileName, 'bookmark')
}

export interface bookmarkItem {
  cfi: string,
  text: string
}

export function saveBookmark(fileName: string, bookmark: bookmarkItem[]) {
  setBookObject(fileName, 'bookmark', bookmark)
}