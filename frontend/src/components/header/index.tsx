import { defineMessages } from '@formatjs/intl'
import { FormattedMessage } from 'react-intl'
import { Logout, Movie, MusicNote, Person, Settings } from '@mui/icons-material'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { useLogoutAction } from '../../hooks/use-logout-action'
import { HeaderLink } from './header-link'

const messages = defineMessages({
  videos: {
    id: 'FlakeLayout.Header.Videos',
    defaultMessage: 'Videos',
  },
  music: {
    id: 'FlakeLayout.Header.Music',
    defaultMessage: 'Music',
  },
  settings: {
    id: 'FlakeLayout.Header.Settings',
    defaultMessage: 'Settings',
  },
  user: {
    id: 'FlakeLayout.Header.User',
    defaultMessage: 'User',
  },
  profile: {
    id: 'FlakeLayout.Header.Profile',
    defaultMessage: 'Profile',
  },
  logout: {
    id: 'FlakeLayout.Header.Logout',
    defaultMessage: 'Log out',
  },
})

export const FlakeHeader = () => {
  const logoutAction = useLogoutAction()

  return (
    <AppBar className="header" sx={{ background: 'transparent' }}>
      <Toolbar
        sx={{
          background: 'rgba(25, 118, 210, .7)',
          backdropFilter: 'blur(15px)',
        }}>
        <HeaderLink
          to="/"
          sx={{ flexGrow: 1, background: 'transparent !important' }}
          title={
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Flake
            </Typography>
          }
        />
        <HeaderLink to="/videos" icon={<Movie />} title={<FormattedMessage {...messages.videos} />}></HeaderLink>
        <HeaderLink to="/music" icon={<MusicNote />} title={<FormattedMessage {...messages.music} />} />
        <HeaderLink to="/settings/system" icon={<Settings />} title={<FormattedMessage {...messages.settings} />} />

        <HeaderLink to="/user/profile" icon={<Person />} title={<FormattedMessage {...messages.profile} />} />
        <HeaderLink
          sx={{ background: 'transparent !important' }}
          to="/"
          onClick={logoutAction}
          icon={<Logout />}
          data-testid="logout-button"
          title={<FormattedMessage {...messages.logout} />}
        />
      </Toolbar>
    </AppBar>
  )
}
