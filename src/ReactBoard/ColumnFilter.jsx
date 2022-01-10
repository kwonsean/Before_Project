import React from 'react'

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column
  return (
    <span>
      ColumnSearch:{' '}
      <input
        value={filterValue || ''}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}
