import {Rendition,Book} from 'epubjs'

export function isRendition(rendition:any): rendition is Rendition {
    return rendition !== undefined
}

export function isBook(book:any): book is Book {
    return book !== null
}

