import { ResponseError } from '@furystack/rest-client-fetch'
import { CircularProgress } from '@mui/material'
import { User } from 'common'
import { CurrentUserContext } from '../hooks/use-current-user'
import { useCurrentUserFetcher } from '../hooks/use-current-user-fetcher'
import { ErrorPage } from '../pages/error'
import { LoginPage } from '../pages/login'
import { FlakeApplicationLayout } from './flake-application-layout'

export const Initializer = () => {
  const currentUser = useCurrentUserFetcher()

  if (currentUser.isLoading && !currentUser.data) {
    return (
      <div style={{ padding: '5em', width: '100%', height: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  if (currentUser.error instanceof ResponseError && currentUser.error.response.status === 401) {
    return (
      <LoginPage
        onLoggedIn={() => {
          console.log('jeee')
        }}
      />
    )
  }

  if (currentUser.error) {
    return <ErrorPage error={currentUser.error} />
  }

  return (
    <CurrentUserContext.Provider value={currentUser.data?.result as User}>
      <FlakeApplicationLayout />
    </CurrentUserContext.Provider>
  )
}
