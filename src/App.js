import './App.css'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

// import Chart from './Chart'
import Nav from './components/Nav'
import MainPage from './components/MainPage'
// import OutsideColumnFilter from './ReactBoard/Practice/OutsideColumnFilter'

function App() {
  return (
    <>
      <Header>This is HEADER</Header>
      <BrowserRouter>
        <Container>
          <LeftNav>
            <Nav />
          </LeftNav>
          <MainWrapper>
            <MainPage />
          </MainWrapper>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App

const Header = styled.header`
  background-color: royalblue;
  padding: 20px;
  text-align: center;
  font-weight: 900;
  font-size: 30px;
`

const LeftNav = styled.nav`
  background-color: salmon;
  width: 250px;
  float: left;
`
// 현재는 컨테이너를 이용하여 Nav배경을 눈속임 하고 있다.
const Container = styled.div`
  float: left;
  width: 100%;
  background: salmon;
`
const MainWrapper = styled.div`
  float: left;
  width: calc(100% - 330px);
  background-color: yellow;
  padding: 40px;
`
