import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useRowSelect } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // 추가
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    // 행 선택
    useRowSelect,
    (hooks) => {
      console.log('hooks', hooks.visibleColumns)
      hooks.visibleColumns.push((columns) => {
        return [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]
      })
    }
  )

  // Render the UI for your table
  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
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
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  (d) => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </>
  )
}

function SelectedTable() {
  const columns = React.useMemo(
    () => [
      // Header는 표의 Header
      // accessor가 Key (data에서 가져옴)
      {
        Header: 'ID',
        accessor: 'id',
        Filter: true,
      },
      {
        Header: '상태',
        accessor: 'status',
        disableSortBy: true, // 정렬 쓰지 않을 행 선택 지정
        // setFilter를 사용해서 밖에서 다룰때에는 그 행에 Filter가 설정되어 있어야 된다.
        Filter: true,
      },
      {
        Header: '서베이 제목',
        accessor: 'title',
        Filter: true,
        Cell: ({ value: CellValue }) => {
          return <input placeholder={CellValue} value={CellValue}></input>
        },
      },
      {
        Header: '브랜드',
        accessor: 'brand',
        Filter: true,

        // filter 기본제공 옵션
        // https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
        // filter: filterGreaterThan,
      },
    ],
    []
  )

  const data = [
    {
      id: 1,
      status: '진행',
      title: '양념갈비',
      date: '2022-01-01T00:00:00.000Z',
      brand: '풀무원',
    },
    {
      id: 2,
      status: '진행',
      title: '그냥 갈비',
      date: '2022-01-02T00:00:00.000Z',
      brand: '비비고',
    },
    {
      id: 3,
      status: '대기',
      title: '고기만두',
      date: '2022-01-02T00:00:00.000Z',
      brand: '',
    },
    {
      id: 4,
      status: '진행',
      title: '김치만두',
      date: '2022-01-03T00:00:00.000Z',
      brand: '가야식품',
    },
    {
      id: 5,
      status: '진행',
      title: '물',
      date: '2022-01-03T00:00:00.000Z',
      brand: '',
    },
    {
      id: 6,
      status: '대기',
      title: '콜라',
      date: '2022-01-05T00:00:00.000Z',
      brand: '',
    },
    {
      id: 7,
      status: '대기',
      title: '고등어',
      date: '2022-01-05T00:00:00.000Z',
      brand: '',
    },
    {
      id: 8,
      status: '진행',
      title: '양념게장',
      date: '2022-01-05T00:00:00.000Z',
      brand: '풀무원',
    },
    {
      id: 9,
      status: '진행',
      title: '간장게장',
      date: '2022-01-08T00:00:00.000Z',
      brand: '',
    },
    {
      id: 10,
      status: '진행',
      title: '치즈',
      date: '2022-01-08T00:00:00.000Z',
      brand: '',
    },
    {
      id: 11,
      status: '진행',
      title: '피자',
      date: '2022-01-10T00:00:00.000Z',
      brand: '',
    },
  ]
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default SelectedTable
