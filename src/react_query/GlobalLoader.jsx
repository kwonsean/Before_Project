import React from 'react'
import { useIsFetching } from 'react-query'
import styled from 'styled-components'

export default function GlobalLoader() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <Div>Queries are fetching in the background...</Div>
  ) : null
}

const Div = styled.div`
  color: red;
  font-size: 25px;
  background-color: white;
`
