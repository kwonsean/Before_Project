import React, { useEffect, useState } from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFilters,
} from 'react-table'

import axios from 'axios'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'
import SelectColumnFilter from './SelectColumnFilter'

export default function ReactTable() {
  const URL = 'https://syoon0624.github.io/json/test.json'
  const [bankData, setBankData] = useState([])

  const getData = () => {
    axios.get(URL).then((response) => setBankData(response.data.bankList))
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(bankData)
  }, [bankData])

  const data = React.useMemo(() => {
    const fixedData = bankData.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return fixedData
  }, [bankData])

  const columns = React.useMemo(
    () => [
      // Header는 표의 Header
      // accessor가 Key (data에서 가져옴)
      {
        Header: 'INDEX',
        accessor: 'index',
        Filter: ColumnFilter,
      },
      {
        Header: 'HISTORY',
        accessor: 'history',
        disableSortBy: true, // 정렬 쓰지 않을 행 선택 지정
        Filter: ColumnFilter,
      },
      {
        Header: 'INCOME',
        accessor: 'income',
        Filter: ColumnFilter,
      },
      {
        Header: 'CLASSIFY',
        accessor: 'classify',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'PRICE',
        accessor: 'price',
        Filter: ColumnFilter,
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // row 대신 page 사용 default는 page당 10개 데이터
    // 버튼 클릭시 page이동
    nextPage,
    previousPage,
    // 페이지 이동 가능 여부 true or false
    canNextPage,
    canPreviousPage,
    // 페이지 정보
    pageOptions,
    // 페이지 점프
    gotoPage,
    pageCount,
    // 페이지 크기 조정
    setPageSize,
    setGlobalFilter,
    // table 상태에 관련된 모든것
    state,
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 2 }, // 기본적으로 pageIndex는 0부터 시작하며 기본값을 바꿀수 있음 하지만 데이터가 밀려나는건 아니기 때문에 (1페이지에 있는거 안보임) 안쓸듯
    },
    useFilters,
    useGlobalFilter, // 순서가 있음 (에러창 확인)
    useSortBy,
    usePagination
  )
  // 페이지의 index값 사용 가능
  const { pageIndex, pageSize, globalFilter } = state
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        {...getTableProps()}
        style={{
          border: 'solid 1px blue',
          margin: '0 auto',
          width: '80%',
          marginBottom: 10,
        }}
      >
        <thead style={{ margin: 10, borderSpacing: '100px 100px' }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 3px blue',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.isSorted
                    ? column.isSortedDesc
                      ? `${column.render('Header')} 🔽`
                      : `${column.render('Header')} 🔼`
                    : `${column.render('Header')}`}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px 25px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ marginBottom: 200 }}>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: 50 }}
          ></input>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Page Size {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </>
  )
}
