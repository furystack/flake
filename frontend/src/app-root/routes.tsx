import { SettingsTypeName, SettingsTypeNames } from 'common'
import { Route, Switch } from 'react-router'
import { Loader } from '../components/loader'
import { useCurrentUser } from '../hooks/use-current-user'
import { NotFoundPage } from '../pages/not-found'

export const Routes = () => {
  const user = useCurrentUser()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Switch>
        {user.hasRole('admin') && (
          <Route path="/settings/system/:settingName?">
            <Loader
              load={async () => {
                const { SystemSettingsPage } = await import(
                  /* webpackChunkName: "system-settings" */ '../pages/settings/system/system-settings-page'
                )
                return (
                  <SystemSettingsPage
                    setting={
                      SettingsTypeNames.includes(match.params.settingName as SettingsTypeName)
                        ? (match.params.settingName as SettingsTypeName)
                        : 'SYSTEM'
                    }
                  />
                )
              }}
            />
          </Route>
        )}
        <Route path="/videos">
          {' '}
          <Loader
            load={async () => {
              const { VideoPage } = await import(/* webpackChunkName: "video" */ '../pages/video/video-page')
              return <VideoPage />
            }}
          />
        </Route>

        <Route path="/music">
          <Loader
            load={async () => {
              const { MusicPage } = await import(/* webpackChunkName: "music" */ '../pages/music/music-page')
              return <MusicPage />
            }}
          />
        </Route>
        <Route path="/user/profile">
          <Loader
            load={async () => {
              const { ProfilePage } = await import(/* webpackChunkName: "user-profile" */ '../pages/user/profile-page')
              return <ProfilePage />
            }}
          />
        </Route>
        <Route path="/">
          {' '}
          <Loader
            load={async () => {
              const { DashboardPage } = await import(/* webpackChunkName: "dashboard" */ '../pages/dashboard')
              return <DashboardPage />
            }}
          />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  )
}
