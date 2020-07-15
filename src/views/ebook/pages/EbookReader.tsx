import React, { useEffect, useRef, memo } from 'react'
import { useParams } from 'react-router-dom'
import { useStore as useGlobalStore } from '@/store/global'
import { useObserver } from 'mobx-react'
import Epub, { Book, Rendition } from 'epubjs'

interface ParamTypes {
  fileName: string
}

const baseUrl = 'http://localhost:9900/epub/'

const EbookReader: React.FC = () => {
  const globalStore = useGlobalStore()
  const { fileName } = useParams<ParamTypes>()

  const currentBook = useRef<Book | null>(null)
  const currentRendition = useRef<Rendition | null>(null)

  useEffect(() => {
    globalStore.changeFileName(fileName)
    const url = `${baseUrl}${fileName.split('|').join('/')}.epub`
    currentBook.current = Epub(url)
    currentRendition.current = currentBook.current.renderTo('read',{
        width:window.innerWidth,
        height:window.innerHeight,
    })
    currentRendition.current.display()
  }, [fileName, globalStore])

  return useObserver(() => (
    <div className="ebookReader">
      <div id="read"></div>
    </div>
  ))
}

export default memo(EbookReader)
