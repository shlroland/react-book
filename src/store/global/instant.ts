function Store() {
  return {
    fileName: 'epub',
    changeFileName(fileName: string) {
      console.log(fileName)
      this.fileName = fileName
    },
  }
}

export default Store
