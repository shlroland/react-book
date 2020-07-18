import React, { useEffect, useRef, memo } from 'react'
import { useParams } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import Epub, { Book, Rendition } from 'epubjs'
import { useStore as useEbookStore } from '@/store/ebook'
import EbookReaderWrapper from './style'

interface ParamTypes {
  fileName: string
}

const baseUrl = 'http://localhost:9900/epub/'

const EbookReader: React.FC = () => {
  const ebookStore = useEbookStore()
  const { fileName } = useParams<ParamTypes>()

  const currentRendition = useRef<Rendition | null>(null)

  useEffect(() => {
    const url = `${baseUrl}${fileName.split('|').join('/')}.epub`
    ebookStore.changeFileName(fileName)
    ebookStore.changeCurrentBook(Epub(url))

    currentRendition.current = (ebookStore.currentBook as Book).renderTo(
      'read',
      {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    )
    currentRendition.current.display()
  }, [fileName, ebookStore])

  return useObserver(() => (
    <EbookReaderWrapper>
      {/* <div className="ebook-reader-mask" ref={maskRef}></div> */}
        <div id="read"></div>
    </EbookReaderWrapper>
  ))
}

export default memo(EbookReader)
