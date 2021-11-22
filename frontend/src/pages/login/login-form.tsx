import { Button, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC, FormEvent, useCallback, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQueryClient } from 'react-query'
import { GitHub, Google } from '@mui/icons-material'
import { useAuthApiContext } from '../../hooks/use-auth-api'
import { useGoogleAuth } from '../../hooks/use-google-auth'
import { loginPageMessages } from '.'

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()

  const callApi = useAuthApiContext()
  const intl = useIntl()
  const snack = useSnackbar()

  const googleAuth = useGoogleAuth()

  const login = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault()
      try {
        await callApi({
          method: 'POST',
          action: '/login',
          body: {
            username,
            password,
          },
        })
        queryClient.invalidateQueries('GET_CURRENT_USER')
      } catch (error) {
        snack.enqueueSnackbar(intl.formatMessage(loginPageMessages.invalidEmailOrPassword), { variant: 'error' })
      }
    },
    [callApi, intl, password, queryClient, snack, username],
  )

  return (
    <form onSubmit={login} data-testid="login-form">
      <TextField
        label={<FormattedMessage {...loginPageMessages.email} />}
        type="email"
        onChange={(ev) => {
          setUsername(ev.target.value)
        }}
        required
      />
      <TextField
        type="password"
        onChange={(ev) => setPassword(ev.target.value)}
        required
        label={<FormattedMessage {...loginPageMessages.password} />}
      />

      <Button type="submit">
        <FormattedMessage {...loginPageMessages.login} />
      </Button>
      <Button
        onClick={() => {
          googleAuth.login()
        }}>
        <Google />
      </Button>
      <Button
        onClick={() => {
          alert('TODO')
        }}>
        <GitHub />
      </Button>
    </form>
  )
}
