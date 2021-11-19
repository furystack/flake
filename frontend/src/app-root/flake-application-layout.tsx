import { Container, Box } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { FlakeHeader } from '../components/header'
import { MainRoutes } from './main-routes'

export const FlakeApplicationLayout = () => (
  <Router>
    <Box height="100%" marginTop={0} top={0}>
      <FlakeHeader />
      <Box marginTop={'64px'} flexDirection="row">
        <Container className="site-layout-background">
          <MainRoutes />
        </Container>
      </Box>
    </Box>
  </Router>
)
