import { useQueryClient } from 'react-query'
import { Retrier } from '@furystack/utils'
import { useCallback } from 'react'
import { useAuthApiContext } from './use-auth-api'

const getGoogleLoginUrl = (clientId: string, redirectUri = window.location.origin, scope = ['email', 'profile']) =>
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?response_type=id_token` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&scope=${encodeURIComponent(scope.join(' '))}` +
  `&client_id=${encodeURIComponent(clientId)}` +
  `&nonce=${Math.random().toString()}`

const getGoogleTokenFromUri = (uri: Location) => {
  const tokenSegmentPrefix = '#id_token='
  const tokenSegment = uri.hash.split('&').find((segment) => segment.indexOf(tokenSegmentPrefix) === 0)
  if (tokenSegment) {
    return tokenSegment.replace(tokenSegmentPrefix, '')
  }
  return null
}

const getTokenSilent = async (loginUrl: string, windowInstance = window): Promise<string> => {
  const token = await new Promise<string>((resolve, reject) => {
    const iframe = windowInstance.document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts')

    iframe.onload = async (ev) => {
      let location: Location | null = null
      await Retrier.create(async () => {
        try {
          // eslint-disable-next-line prefer-destructuring
          location = ((ev.srcElement as HTMLIFrameElement).contentDocument as Document).location
          return true
        } catch (error) {
          return false
        }
      })
        .setup({
          timeoutMs: 500,
        })
        .run()

      const iframeToken = location && getGoogleTokenFromUri(location)
      iframeToken ? resolve(iframeToken) : reject(Error('Token not found'))
      windowInstance.document.body.removeChild(iframe)
    }
    iframe.src = loginUrl
    windowInstance.document.body.appendChild(iframe)
  })

  return token
}

const getTokenFromPrompt = async (loginReqUrl: string, windowInstance = window) => {
  return new Promise<string>((resolve, reject) => {
    const popup = windowInstance.open(
      loginReqUrl,
      '_blank',
      'toolbar=no,scrollbars=no,resizable=no,top=200,left=300,width=400,height=400',
    )
    const timer = setInterval(() => {
      if (popup?.window) {
        try {
          if (popup.window.location.href !== loginReqUrl) {
            const token = getGoogleTokenFromUri(popup.window.location)
            if (token) {
              resolve(token)
              popup.close()
              clearInterval(timer)
            }
          }
        } catch (error) {
          /** cross-origin */
        }
      } else {
        // Popup closed
        reject(Error('The popup has been closed'))
        clearInterval(timer)
      }
    }, 50)
  })
}

export const useGoogleAuth = () => {
  const queryClient = useQueryClient()
  const api = useAuthApiContext()

  const getToken = useCallback(async () => {
    const { result: oauthData } = await api({
      method: 'GET',
      action: '/oauth-data',
    })
    const loginReqUrl = getGoogleLoginUrl(oauthData.googleClientId)
    try {
      return await getTokenSilent(loginReqUrl)
    } catch (error) {
      /** Cannot get token */
    }
    return await getTokenFromPrompt(loginReqUrl)
  }, [api])

  const signup = useCallback(async () => {
    const token = await getToken()
    await api({ method: 'POST', action: '/googleRegister', body: { token } })
    queryClient.invalidateQueries('GET_CURRENT_USER')
  }, [api, getToken, queryClient])

  const login = useCallback(async () => {
    const token = await getToken()
    await api({ method: 'POST', action: '/googleLogin', body: { token } })
    queryClient.invalidateQueries('GET_CURRENT_USER')
  }, [api, getToken, queryClient])

  return { signup, login }
}
