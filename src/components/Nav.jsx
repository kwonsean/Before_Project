import React from 'react'
import styled from 'styled-components'
import { NavLink, useSearchParams } from 'react-router-dom'

export default function Nav() {
  let [searchParams] = useSearchParams()
  console.log('searchParams', searchParams)
  console.log('searchParams', searchParams.has('/styled'))
  return (
    <StyledUl>
      <StyledLi>
        <StyledNavLink end to='/'>
          React Table
        </StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink end to='/styled'>
          Styled Component
        </StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink end to='/sheetJS'>
          Sheet JS
        </StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink end to='/query'>
          React Query
        </StyledNavLink>
      </StyledLi>
    </StyledUl>
  )
}

const StyledUl = styled.ul`
  padding-left: 0px;
`

const StyledLi = styled.li`
  list-style: none;
  margin-bottom: 20px;
`
const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: 500;
  font-size: 20px;
  color: white;
  &.active {
    color: #f9fd00;
    font-size: 22px;
  }
  &.active:hover {
    color: #f9fd00;
    background-color: tomato;
    font-size: 22px;
  }
  &:hover {
    background-color: tomato;
    color: #5f0000;
  }
`
