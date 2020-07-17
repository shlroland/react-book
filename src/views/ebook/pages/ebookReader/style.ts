import styled from 'styled-components'

const EbookReaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default EbookReaderWrapper