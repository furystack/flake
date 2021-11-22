import { Container } from '@mui/material'
import { FC } from 'react'

export const ErrorPage: FC<{ error: unknown }> = () => {
  return <Container>Error</Container>
}
