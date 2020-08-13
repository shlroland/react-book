import { TFunction } from 'i18next'
import { themeType } from '@/store/ebook/types'
import { getReadTime, removeLocalStorage } from './localStorage'
import { BookList } from '@/views/mall/shelf/types'
import { removeLocalForage } from './localForage'

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

export function getReadTimeByMinute(fileName: string) {
  if (!getReadTime(fileName)) {
    return 0
  } else {
    return Math.ceil(getReadTime(fileName) / 60)
  }
}

export function categoryText(category: number, t: TFunction) {
  switch (category) {
    case 1:
      return t('computerScience')
    case 2:
      return t('socialSciences')
    case 3:
      return t('economics')
    case 4:
      return t('education')
    case 5:
      return t('engineering')
    case 6:
      return t('environment')
    case 7:
      return t('geography')
    case 8:
      return t('history')
    case 9:
      return t('laws')
    case 10:
      return t('lifeSciences')
    case 11:
      return t('literature')
    case 12:
      return t('biomedicine')
    case 13:
      return t('businessandManagement')
    case 14:
      return t('earthSciences')
    case 15:
      return t('materialsScience')
    case 16:
      return t('mathematics')
    case 17:
      return t('medicineAndPublicHealth')
    case 18:
      return t('philosophy')
    case 19:
      return t('physics')
    case 20:
      return t('politicalScienceAndInternationalRelations')
    case 21:
      return t('psychology')
    case 22:
      return t('statistics')
    default:
      return '暂无标题'
  }
}

export function getCategoryName(id: number) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
    default:
      return ''
  }
}

export const categoryList = {
  ComputerScience: 1,
  SocialSciences: 2,
  Economics: 3,
  Education: 4,
  Engineering: 5,
  Environment: 6,
  Geography: 7,
  History: 8,
  Laws: 9,
  LifeSciences: 10,
  Literature: 11,
  Biomedicine: 12,
  BusinessandManagement: 13,
  EarthSciences: 14,
  MaterialsScience: 15,
  Mathematics: 16,
  MedicineAndPublicHealth: 17,
  Philosophy: 18,
  Physics: 19,
  PoliticalScienceAndInternationalRelations: 20,
  Psychology: 21,
  Statistics: 22,
}

export function flatBookList(bookList: BookList) {
  if (bookList) {
    let orgBookList = bookList.filter((item) => {
      return item.type !== 3
    })
    const categoryList = bookList.filter((item) => {
      return item.type === 2
    })
    categoryList.forEach((item) => {
      const index = orgBookList.findIndex((v) => {
        return v.id === item.id
      })
      if (item.itemList) {
        item.itemList.forEach((subItem: any) => {
          orgBookList.splice(index, 0, subItem)
        })
      }
    })
    orgBookList.forEach((item, index) => {
      item.id = index + 1
    })
    orgBookList = orgBookList.filter((item) => item.type !== 2)
    return orgBookList
  } else {
    return []
  }
}

export function footerTabs(t: TFunction) {
  return [
    {
      label: t('private'),
      label2: t('noPrivate'),
      index: 1,
    },
    {
      label: t('download'),
      label2: t('delete'),
      index: 2,
    },
    {
      label: t('move'),
      index: 3,
    },
    {
      label: t('remove'),
      index: 4,
    },
  ]
}

export function removeBookCache(fileName:string) {
  return new Promise((resolve, reject) => {
    removeLocalStorage(fileName)
    removeLocalStorage(`${fileName}-info`)
    removeLocalForage(fileName, () => {
      console.log(`[${fileName}]删除成功...`)
      resolve()
    }, reject)
  })
}