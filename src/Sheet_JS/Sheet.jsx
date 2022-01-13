import React, { useEffect, useState } from 'react'
import XLSX from 'xlsx'

export default function Sheet() {
  const [dataList, setDatatList] = useState([])
  const excelExport = (e) => {
    let reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = function () {
      let fileData = reader.result
      let wb = XLSX.read(fileData, { type: 'binary' })
      wb.SheetNames.forEach(function (sheetName) {
        let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
        console.log(rowObj) // 한줄 한줄 배열형태로 출력

        console.log(JSON.stringify(rowObj)) // JSON형식으로 변환하여 출력
        setDatatList((cur) => [...cur, rowObj])
      })
    }
  }

  useEffect(() => {
    console.log('dataList', dataList)
  }, [dataList])
  return (
    <>
      기본 모드 : <input type='file' onChange={(e) => excelExport(e)} />
      {dataList[1] &&
        dataList[1].map((item) => <div>{item['기능 명세서']}</div>)}
    </>
  )
}
