import React from 'react'

// TODO PRICE에선 제대로 작동 X.. 쓰게 된다면 원인 파악해야함
// 해결함!
export default function SliderColumFilter({ column }) {
  const { filterValue, setFilter, preFilteredRows, id } = column

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])
  // console.log(min, max)

  return (
    <>
      <input
        type='range'
        min={min}
        max={max}
        step='1000'
        value={filterValue || min}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />

      <br />
      <button
        onClick={(e) => {
          e.stopPropagation()
          setFilter(undefined)
        }}
      >
        RESET
      </button>
      <p>
        {' '}
        {filterValue ? filterValue.toLocaleString('ko-KR') + '원' : '0원'} 이상
        값
      </p>
    </>
  )
}
