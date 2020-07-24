import {Rendition} from 'epubjs'

export function isRendition(rendition:any): rendition is Rendition {
    return rendition !== undefined
}