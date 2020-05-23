export const initBookShelf = (list) => {
  list.forEach((item) => {
    item.selected = false
  })
}

export const appendAddToBookList = (bookList) => {
  bookList.push({
    cover: '',
    title: '',
    type: 3,
    // id: this.bookList[this.bookList.length - 1].id + 1
    id: Number.MAX_SAFE_INTEGER,
  })
}
