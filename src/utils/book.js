import { realPx } from './utils'
import { getReadTime } from './localStorage'
import Default from '@/assets/style/theme/Default'
import Gold from '@/assets/style/theme/Gold'
import Eye from '@/assets/style/theme/Eye'
import Night from '@/assets/style/theme/Night'

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 },
]

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' },
]

export function genThemeList(t) {
  return [
    {
      alias: t('themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#f2f3f4',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`,
        },
        img: {
          width: '100%',
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply',
        },
      },
    },
    {
      alias: t('themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`,
        },
        img: {
          width: '100%',
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply',
        },
      },
    },
    {
      alias: t('themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`,
        },
        img: {
          width: '100%',
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply',
        },
      },
    },
    {
      alias: t('themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`,
        },
        img: {
          width: '100%',
        },
        '.epubjs-hl': {
          fill: 'red',
          'fill-opacity': '0.3',
          'mix-blend-mode': 'multiply',
        },
      },
    },
  ]
}

export function genGlobalThemeList(name = 'Default') {
  switch (name) {
    case 'Default':
      return Default
    case 'Gold':
      return Gold
    case 'Eye':
      return Eye
    case 'Night':
      return Night
    default:
      return Default
  }
}

export function getReadTimeByMinute(fileName) {
  if (!getReadTime(fileName)) {
    return 0
  } else {
    return Math.ceil(getReadTime(fileName) / 60)
  }
}
