import './App.css'
import styled from 'styled-components'

// import Chart from './Chart'
import ReactTable from './ReactBoard/ReactTable'
import StyledComponents1 from './Styled_Components/StyledComponents1'
import CopyURL from './tools/CopyURL'
import Sheet from './Sheet_JS/Sheet'
import SheetSetRange from './Sheet_JS/SheetSetRange'
// import OutsideColumnFilter from './ReactBoard/Practice/OutsideColumnFilter'

function App() {
  return (
    <Wrapper>
      <RigthDiv className='App'>
        {/* <Chart /> */}
        <ReactTable />
        {/* <OutsideColumnFilter /> */}
        <StyledComponents1 />
        <CopyURL />
      </RigthDiv>
      <LeftDiv>
        <Sheet />
        <br />
        <SheetSetRange />
      </LeftDiv>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  display: flex;
`

const RigthDiv = styled.div`
  width: 60%;
`
const LeftDiv = styled.div`
  width: 40%;
`
