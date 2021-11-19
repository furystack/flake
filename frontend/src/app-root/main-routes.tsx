import { Route, Routes } from 'react-router'
import { Loader } from '../components/loader'
import { useCurrentUser } from '../hooks/use-current-user'
import { NotFoundPage } from '../pages/not-found'

export const MainRoutes = () => {
  const user = useCurrentUser()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Routes>
        {user.hasRole('admin') && (
          <Route
            path="/settings/system"
            element={
              <Loader
                load={async () => {
                  const { SystemSettingsPage } = await import(
                    /* webpackChunkName: "system-settings" */ '../pages/settings/system/system-settings-page'
                  )
                  return <SystemSettingsPage setting={'GITHUB'} /> // TODO: Subroutes
                }}
              />
            }
          />
        )}
        <Route
          path="/videos"
          element={
            <Loader
              load={async () => {
                const { VideoPage } = await import(/* webpackChunkName: "video" */ '../pages/video/video-page')
                return <VideoPage />
              }}
            />
          }
        />
        <Route
          path="/music"
          element={
            <Loader
              load={async () => {
                const { MusicPage } = await import(/* webpackChunkName: "music" */ '../pages/music/music-page')
                return <MusicPage />
              }}
            />
          }
        />
        <Route
          path="/user/profile"
          element={
            <Loader
              load={async () => {
                const { ProfilePage } = await import(
                  /* webpackChunkName: "user-profile" */ '../pages/user/profile-page'
                )
                return <ProfilePage />
              }}
            />
          }
        />
        <Route
          path="/"
          element={
            <Loader
              load={async () => {
                const { DashboardPage } = await import(/* webpackChunkName: "dashboard" */ '../pages/dashboard')
                return <DashboardPage />
              }}
            />
          }
        />
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
