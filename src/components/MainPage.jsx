import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ExPDF from '../FileSaver/ExPDF'
import ReactTable from '../ReactBoard/ReactTable'
import Example from '../react_query/Example'
import SheetMain from '../Sheet_JS/SheetMain'
import StyledComponents1 from '../Styled_Components/StyledComponents1'

export default function MainPage() {
  return (
    <Routes>
      <Route path='/' element={<ReactTable />} />
      <Route path='/styled' element={<StyledComponents1 />} />
      <Route path='/sheetJS' element={<SheetMain />} />
      <Route path='/query' element={<Example />} />
      <Route path='/pdf' element={<ExPDF />} />
    </Routes>
  )
}
