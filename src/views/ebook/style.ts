import styled from 'styled-components'

interface EbookWrapperProp {
  Y: number
}

const EbookWrapper = styled.div<EbookWrapperProp>`
  position: absolute;
  top: ${(props) => props.Y}px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transition: ${(props) => (!props.Y ? 'all 0.2s linear' : '')};
`

export default EbookWrapper
