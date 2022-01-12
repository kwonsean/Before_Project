import React from 'react'
import styled from 'styled-components'

const URLShareButton = styled.button`
  width: 96px;
  height: 96px;
  color: white;
  border-radius: 48px;
  border: 0px;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: blue;
  &:hover {
    background-color: red;
  }
`

export default function CopyURL() {
  // 현재 URL 가져오기
  const currentUrl = window.location.href

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('복사 성공!')
    } catch (error) {
      alert('복사 실패!')
    }
  }

  return (
    <div className='App'>
      <URLShareButton onClick={() => handleCopyClipBoard(currentUrl)}>
        복사!!
      </URLShareButton>
    </div>
  )
}
