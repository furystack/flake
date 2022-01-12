import { Box, styled } from '@mui/material'
import { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

export const HeaderNavLink: FC<
  { title: JSX.Element; icon?: JSX.Element } & Omit<NavLinkProps, 'title' | 'children'>
> = ({ title, icon, ...navLinkProps }) => (
  <NavLink {...navLinkProps}>
    {icon} <Box sx={{ display: { xs: (icon && 'none') || 'inline', md: 'inline' } }}>{title}</Box>
  </NavLink>
)

export const HeaderLink = styled(HeaderNavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  height: '64px',
  color: theme.palette.getContrastText(theme.palette.primary.main),
  padding: '0 0.7em',
  margin: '0 .1em',
  '&.active': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  '& svg:first-of-type': {
    marginRight: '.2em',
  },
}))
