import { SettingsTypeName, SettingsTypeNames } from 'common'
import { Route, Switch } from 'react-router'
import { useCurrentUser } from '../hooks/use-current-user'
import { DashboardPage } from '../pages/dashboard'
import { NotFoundPage } from '../pages/not-found'
import { SystemSettingsPage } from '../pages/settings/system/system-settings-page'

export const Routes = () => {
  const user = useCurrentUser()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Switch>
        {user.hasRole('admin') && (
          <Route
            exact
            path="/settings/system/:settingName?"
            render={({ match }) => (
              <SystemSettingsPage
                setting={
                  SettingsTypeNames.includes(match.params.settingName as SettingsTypeName)
                    ? (match.params.settingName as SettingsTypeName)
                    : undefined
                }
              />
            )}
          />
        )}
        <Route
          exact
          path="/"
          render={() => {
            return <DashboardPage />
          }}
        />
        <Route render={() => <NotFoundPage />} />
      </Switch>
    </div>
  )
}
