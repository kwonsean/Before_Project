// 이게 작동을 안하는것 같음.. console이 안찍힘
export const filterGreaterThan = (rows, id, filterValue) => {
  // console.log('rows', rows, 'id', id, 'filterValue', filterValue)
  return rows.filter((row) => {
    const rowValue = row.values[id]
    // console.log(rowValue)
    return rowValue >= filterValue
  })
}

// filterGreaterThan.autoRemove = (val) => typeof val !== 'number'
