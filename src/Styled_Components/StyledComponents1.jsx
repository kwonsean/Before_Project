import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function StyledComponents1() {
  return (
    <>
      <Wrapper>
        <Title>Hello World!</Title>
        <Button onClick={(e) => console.log(e.target.innerText)}>Normal</Button>
        <Button primary>Primary</Button>
        <TomatoButton>Tomato</TomatoButton>
        <br />
        <Button as='a' href='#'>
          Link with Button styles
        </Button>
        <TomatoButton as='a' href='https://www.naver.com' target='_blank'>
          Link with Tomato Button styles
        </TomatoButton>
        <br />
        <Button as={ReversedButton}>
          Custom Button with Normal Button styles
        </Button>
        <Button as={StrongButton}>This is Button</Button>
      </Wrapper>
      <br />
      <Thing>Hello world!</Thing>
      <Thing>How ya doing?</Thing>
      <Thing className='something'>The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <Thing>Don't you think?</Thing>
      <div className='something-else'>
        <Thing>Splendid.</Thing>
      </div>
      <br />
      <Input placeholder='A bigger text input' size='2em' />
      <br />
      {/* Notice we can still use the size attr from Input */}
      <PasswordInput placeholder='A bigger password input' size='2em' />
      <Rotate>&lt; 💅🏾 &gt;</Rotate>
    </>
  )
}

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`
// 위에서 선언한 Button을 기반으로 새로운 스타일링 지정 가능 (확장)
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split('').reverse()} />
)

const StrongButton = (props) => (
  <Button {...props} children={props.children + ' !!!'} />
)

const Thing = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: blue;
  // &는 나 자신을 뜻함
  &:hover {
    color: red; // <Thing> when hovered
  }
  // 형제 요소로 있나 (일반 형제 결합자)
  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }
  // 바로 옆에 있나 (인접 형제 결합자)
  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`
const Input = styled.input.attrs((props) => ({
  type: 'text',
  size: props.size || '1em',
}))`
  border: 2px solid palevioletred;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`

// Input's attrs will be applied first, and then this attrs obj
const PasswordInput = styled(Input).attrs({
  type: 'password',
})`
  // similarly, border will override Input's border
  border: 2px solid aqua;
`

// 애니메이션 사용을 위한 변수 (keyframes는 styled-components안에 있음)
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const Rotate = styled.div`
  &:hover {
    animation: ${rotate} 20ms linear infinite;
    cursor: pointer;
  }

  display: inline-block;
  animation: ${rotate} 2s linear infinite;

  padding: 2rem 1rem;
  font-size: 1.2rem;
`
