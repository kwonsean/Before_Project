import React, { useState } from 'react'
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
import SliderColumFilter from './SliderColumFilter'
import { filterGreaterThan } from './filterGreaterThan'
import { useQuery } from 'react-query'
import SelectedTable from './Practice/SelectedTable'

const GetBankData = () => {
  return axios.get('https://syoon0624.github.io/json/test.json')
}

export default function ReactTable() {
  const [isLoading, setIsLoading] = useState(true)
  const {
    data: queryData,
    isSuccess,
    isError,
    error,
  } = useQuery('bank-data', GetBankData, {
    notifyOnChangeProps: ['data', 'error'],
  })

  // if (isError) {
  //   console.log(error)
  // }
  // if (isSuccess) {
  //   console.log(queryData.data)
  // }

  const data = React.useMemo(() => {
    if (queryData === undefined) return []
    const fixedData = queryData.data.bankList.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    setIsLoading(false)
    return fixedData
  }, [queryData])

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
        // setFilter를 사용해서 밖에서 다룰때에는 그 행에 Filter가 설정되어 있어야 된다.
        Filter: true,
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
        Filter: SliderColumFilter,
        // filter 기본제공 옵션
        // https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
        filter: filterGreaterThan,
        Cell: ({ value }) => value.toLocaleString('ko-KR') + '원',
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
    // !! setFilter를 이용해서 밖에서도 검색 가능 setFilter('accessor값', e.target.value)
    setFilter,
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

  const [searchOption, setSerachOption] = useState('default')

  const searchData = (e) => {
    if (searchOption === 'default') {
      setGlobalFilter(e.target.value)
    } else if (searchOption === 'history') {
      setFilter('history', e.target.value)
    } else if (searchOption === 'classify') {
      setFilter('classify', e.target.value)
    }
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <br />
      <select onChange={(e) => setSerachOption(e.target.value)}>
        <option value='default'>ALL</option>
        <option value='history'>HISTORY</option>
        <option value='classify'>CLASSIFY</option>
      </select>
      <input placeholder='검색' onChange={(e) => searchData(e)} />

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
                    userSelect: 'none',
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
      <br />
      <SelectedTable />
    </>
  )
}
