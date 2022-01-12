import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import OutsideColumnFilter from './OutsideColumnFilter'
import TableFilter from './TableFilter'

import axios from 'axios'

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
`

const ReactTablePractice = () => {
  const URL = 'https://syoon0624.github.io/json/test.json'
  const [bankData, setBankData] = useState([])

  const getData = () => {
    axios.get(URL).then((response) => setBankData(response.data.bankList))
  }

  useEffect(() => {
    getData()
  }, [])

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
      },
      {
        Header: 'HISTORY',
        accessor: 'history',
      },
      {
        Header: 'INCOME',
        accessor: 'income',
      },
      {
        Header: 'CLASSIFY',
        accessor: 'classify',
      },
      {
        Header: 'PRICE',
        accessor: 'price',
      },
    ],
    []
  )

  return (
    <Styles>
      <OutsideColumnFilter columns={columns} data={data} header={TableFilter} />
    </Styles>
  )
}

export default ReactTablePractice
