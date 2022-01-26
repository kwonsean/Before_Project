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
          <OutlinedIcon iconName='settings' />
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
      <StyledLi>
        <StyledNavLink end to='/pdf'>
          PDF
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
  display: flex;
  align-items: center;
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
const OutlinedIcon = styled.i.attrs(() => ({
  className: 'material-icons-outlined',
}))`
  font-size: 20px;
  margin-right: 8px;
  font-weight: 400;
  &:after {
    content: 'settings';
    /* content: ${({ iconName }) => iconName || 'settings'}; */
  }
`
// const ThumbUp = styled.i.attrs(() => ({
//   className: 'material-icons-outlined',
// }))`
//   font-size: 14px;
//   &:after {
//     content: 'settings';
//   }
// `
