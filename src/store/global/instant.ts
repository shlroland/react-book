function Store() {
  return {
    fileName: 'epub',
    changeFileName(fileName: string) {
      this.fileName = fileName
    },
  }
}

export default Store
