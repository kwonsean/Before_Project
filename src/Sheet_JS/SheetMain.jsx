import React from 'react'
import ReactSelect from '../components/Select/ReactSelect'
import Sheet from './Sheet'
import SheetSetRange from './SheetSetRange'

export default function SheetMain() {
  return (
    <>
      <Sheet />
      <SheetSetRange />
      <ReactSelect/>
    </>
  )
}
