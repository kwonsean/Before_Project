import React, { useEffect, useState } from 'react'
import XLSX from 'xlsx'
import GenderChart from './GenderChart'

export default function SheetSetRange() {
  const [localDataList, setLocalDatatList] = useState([])
  const [ageDataList, setAgeDatatList] = useState([])
  const [genderDataList, setGenderDatatList] = useState([])

  const excelExport = (e) => {
    let reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])

    reader.onload = function () {
      let fileData = reader.result
      let wb = XLSX.read(fileData, { type: 'binary' })

      wb.SheetNames.forEach(function (sheetName) {
        let range = XLSX.utils.decode_range(wb.Sheets[sheetName]['!ref'])

        // 지역 데이터 담기
        range.s.c = 8 // start column
        range.s.r = 1 // start row
        range.e.c = 10 // end column
        range.e.r = 18 // end row
        let local_range = XLSX.utils.encode_range(range)

        let localData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
          blankRows: false,
          defval: '',
          range: local_range,
        })
        // console.log(localData) // 한줄 한줄 배열형태로 출력
        // console.log(JSON.stringify(localData)) // JSON형식으로 변환하여 출력
        setLocalDatatList((cur) => [...cur, localData])

        // 나이 데이터 담기
        range.s.c = 12 // start column
        range.s.r = 1 // start row
        range.e.c = 13 // end column
        range.e.r = 7 // end row
        let age_range = XLSX.utils.encode_range(range)
        let ageData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
          blankRows: false,
          defval: '',
          range: age_range,
        })

        setAgeDatatList((cur) => [...cur, ageData])

        // 성별 데이터 담기
        range.s.c = 12 // start column
        range.s.r = 8 // start row
        range.e.c = 13 // end column
        range.e.r = 10 // end row
        let gender_range = XLSX.utils.encode_range(range)
        let genderData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
          blankRows: false,
          defval: '',
          range: gender_range,
        })

        setGenderDatatList((cur) => [...cur, genderData])
      })
    }
  }

  useEffect(() => {
    console.log('localDataList', localDataList)
    console.log('ageDataList', ageDataList)
    console.log('genderDataList', genderDataList)
  }, [localDataList, ageDataList, genderDataList])

  return (
    <>
      원하는 구역 설정 도전 :{' '}
      <input type='file' onChange={(e) => excelExport(e)} />
      {/* <GenderChart genderData={genderDataList[0]} /> */}
    </>
  )
}
