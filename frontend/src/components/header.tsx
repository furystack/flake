import { createComponent, RouteLink, Shade } from '@furystack/shades'
import {
  AppBar,
  Button,
  defaultDarkTheme,
  defaultLightTheme,
  ThemeProviderService,
} from '@furystack/shades-common-components'
import { SessionService, SessionState } from '../services/session'

export interface HeaderProps {
  title: string
  links: Array<{ name: string; url: string }>
}

const urlStyle: Partial<CSSStyleDeclaration> = {
  color: '#aaa',
  textDecoration: 'none',
}

export const Header = Shade<HeaderProps, { sessionState: SessionState; themeProvider: ThemeProviderService }>({
  shadowDomName: 'shade-app-header',
  getInitialState: ({ injector }) => ({
    sessionState: injector.getInstance(SessionService).state.getValue(),
    themeProvider: injector.getInstance(ThemeProviderService),
  }),
  constructed: ({ injector, updateState }) => {
    const observable = injector.getInstance(SessionService).state.subscribe((newState) => {
      updateState({ sessionState: newState })
    })
    return () => observable.dispose()
  },
  render: ({ props, injector, getState }) => {
    return (
      <AppBar id="header">
        <h3 style={{ margin: '0 2em 0 0', cursor: 'pointer' }}>
          <RouteLink title={props.title} href="/" style={urlStyle}>
            {props.title}
          </RouteLink>
        </h3>
        {props.links.map((link) => (
          <RouteLink title={link.name} href={link.url} style={{ ...urlStyle, padding: '0 8px', cursor: 'pointer' }}>
            {link.name || ''}
          </RouteLink>
        ))}
        <div style={{ flex: '1' }} />
        <Button
          onclick={() => {
            const newTheme =
              getState().themeProvider.theme.getValue() === defaultDarkTheme ? defaultLightTheme : defaultDarkTheme
            getState().themeProvider.theme.setValue(newTheme)
          }}>
          Switch Theme
        </Button>
        {getState().sessionState === 'authenticated' ? (
          <Button
            variant="outlined"
            onclick={() => injector.getInstance(SessionService).logout()}
            style={{ marginRight: '1em' }}>
            Log Out
          </Button>
        ) : null}
      </AppBar>
    )
  },
})
