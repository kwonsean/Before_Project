import React from 'react'

export default function ColumnFilter({ column }) {
  // console.log(column)
  const { filterValue, setFilter, preFilteredRows } = column
  const count = preFilteredRows.length

  return (
    <span>
      ColumnSearch:{' '}
      <input
        value={filterValue || ''}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`Search ${count} records...`}
      />
    </span>
  )
}
