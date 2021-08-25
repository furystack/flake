import { ResponseError } from '@furystack/rest-client-fetch'
import { Result, Skeleton } from 'antd'
import { useCurrentUser } from '../hooks/use-current-user'
import { LoginPage } from '../pages/login'
import { FlakeApplicationLayout } from './flake-application-layout'

export const Initializer = () => {
  const currentUser = useCurrentUser()

  if (currentUser.isLoading && !currentUser.data) {
    return <Skeleton />
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

  if (currentUser.isError) {
    return <Result status={'error'} />
  }

  return <FlakeApplicationLayout />
}
