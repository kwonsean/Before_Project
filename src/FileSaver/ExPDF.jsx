import Chart from '../Chart.jsx'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import React, { useRef } from 'react'
import styled from 'styled-components'
import ReactTable from '../ReactBoard/ReactTable'

export default function ExPDF() {
  const pdfRef = useRef()

  const onDownloadBtn = async () => {
    const element = pdfRef.current
    const canvas = await html2canvas(element)
    console.log(canvas)
    console.log(canvas.width)
    console.log(canvas.style.width)
    const data = canvas.toDataURL('image/png')

    const pdf = new jsPDF()
    console.log(pdf)
    console.log(pdf.getCurrentPageInfo())
    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
    console.log(pdf.getCreationDate().slice(2, 10))
    const date = pdf.getCreationDate().slice(2, 10)
    pdf.save(`${date}.pdf`)
  }

  return (
    <>
      <Conatiner ref={pdfRef}>
        <StyledDiv>
          <h1>카드 컴포넌트</h1>
          <ul>
            <li>여기에</li>
            <li>아무거나</li>
            <li>써도 되요?</li>
          </ul>
        </StyledDiv>
        <ReactTable />
        <Chart />
      </Conatiner>
      <button onClick={onDownloadBtn}>다운로드 버튼</button>
    </>
  )
}
const Conatiner = styled.div`
  background-color: white;
  padding: 20px;
`

const StyledDiv = styled.div`
  padding: 20px;
  background-color: orange;
`
