import { TFunction } from 'i18next'
import { themeType } from '@/store/ebook/types'

export const fontSizeList = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 },
]

export const fontFamily = [
  { font: 'Times New Roman' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' },
]

export function genThemeList(t: TFunction): ebookItemType[] {
  return [
    {
      alias: t('themeDefault'),
      name: 'Default',
      color: '#4c5059',
      background: '#f2f3f4',
      
    },
    {
      alias: t('themeGold'),
      name: 'Gold',
      color: '#5c5b56',
      background: '#c6c2b6',
      // style: {
      //   body: {
      //     color: '#5c5b56',
      //     background: '#c6c2b6',
      //     'padding-top': `${realPx(48)}px!important`,
      //     'padding-bottom': `${realPx(48)}px!important`,
      //   },
      //   img: {
      //     width: '100%',
      //   },
      //   '.epubjs-hl': {
      //     fill: 'red',
      //     'fill-opacity': '0.3',
      //     'mix-blend-mode': 'multiply',
      //   },
      // },
    },
    {
      alias: t('themeEye'),
      name: 'Eye',
      color: '#404c42',
      background: '#a9c1a9',
      // style: {
      //   body: {
      //     color: '#404c42',
      //     background: '#a9c1a9',
      //     'padding-top': `${realPx(48)}px!important`,
      //     'padding-bottom': `${realPx(48)}px!important`,
      //   },
      //   img: {
      //     width: '100%',
      //   },
      //   '.epubjs-hl': {
      //     fill: 'red',
      //     'fill-opacity': '0.3',
      //     'mix-blend-mode': 'multiply',
      //   },
      // },
    },
    {
      alias: t('themeNight'),
      name: 'Night',
      color: '#cecece',
      background: '#000000',
      // style: {
      //   body: {
      //     color: '#cecece',
      //     background: '#000000',
      //     'padding-top': `${realPx(48)}px!important`,
      //     'padding-bottom': `${realPx(48)}px!important`,
      //   },
      //   img: {
      //     width: '100%',
      //   },
      //   '.epubjs-hl': {
      //     fill: 'red',
      //     'fill-opacity': '0.3',
      //     'mix-blend-mode': 'multiply',
      //   },
      // },
    },
  ]
}

export interface ebookItemType {
  alias: string
  name: themeType
  color: string
  background: string
  // style: {
  //   body: {
  //     color: string
  //     background: string
  //     'padding-top': string
  //     'padding-bottom': string
  //   }
  //   img: {
  //     width: string
  //   }
  //   '.epubjs-hl': {
  //     fill: string
  //     'fill-opacity': string
  //     'mix-blend-mode': string
  //   }
  // }
}
