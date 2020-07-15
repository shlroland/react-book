import { observable,action } from 'mobx'

export default class EbookStore {
    @observable fileName = ''


    @action
    changeFileName(fileName:string) {
        this.fileName = fileName
    }
}