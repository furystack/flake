import { Menu } from 'antd'
import {
  VideoCameraOutlined,
  AuditOutlined,
  EuroOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  SmileOutlined,
  ToolOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { Header } from 'antd/lib/layout/layout'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { defineMessages } from '@formatjs/intl'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLocationKeys } from '../hooks/use-location-keys'
import { useLogoutAction } from '../hooks/use-logout-action'

const messages = defineMessages({
  videos: {
    id: 'FlakeLayout.Header.Videos',
    defaultMessage: 'Videos',
  },
  music: {
    id: 'FlakeLayout.Header.Music',
    defaultMessage: 'Music',
  },
  money: {
    id: 'FlakeLayout.Header.Money',
    defaultMessage: 'Money',
  },
  settings: {
    id: 'FlakeLayout.Header.Settings',
    defaultMessage: 'Settings',
  },
  systemSettings: {
    id: 'FlakeLayout.Header.SystemSettings',
    defaultMessage: 'System Settings',
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
  const [transform, setTransform] = useState('')
  const locationKeys = useLocationKeys()
  const logoutAction = useLogoutAction()
  const intl = useIntl()

  const onScroll = useCallback(() => {
    if (window.scrollY > 60) {
      setTransform('translateY(-70px)')
    } else {
      setTransform('translateY(0px)')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <Header
      className="header"
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backdropFilter: 'blur(15px)',
        backgroundColor: 'rgba(64,64,64,0.3)',
        transition: 'transform 500ms cubic-bezier(0.695, 0.840, 0.220, 0.990)',
        transform,
        display: 'flex',
      }}>
      <Menu mode="horizontal" selectedKeys={locationKeys} style={{ width: '100%' }}>
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="/videos" icon={<VideoCameraOutlined />}>
          <Link to="/videos">
            <FormattedMessage {...messages.videos} />
          </Link>
        </Menu.Item>
        <Menu.Item key="/music" icon={<AuditOutlined />}>
          <Link to="/music">
            <FormattedMessage {...messages.music} />
          </Link>
        </Menu.Item>
        <Menu.Item key="/money" icon={<EuroOutlined />}>
          <Link to="/money">
            <FormattedMessage {...messages.money} />
          </Link>
        </Menu.Item>
        <Menu.SubMenu icon={<SettingOutlined />} key="/settings" title={intl.formatMessage(messages.settings)}>
          <Menu.Item icon={<ToolOutlined />} key="/settings/system">
            <Link to="/settings/system">
              <FormattedMessage {...messages.systemSettings} />
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<UserOutlined />} key="/user" title={intl.formatMessage(messages.user)}>
          <Menu.Item key="/user/profile" icon={<SmileOutlined />}>
            <Link to="/user/profile">
              <FormattedMessage {...messages.profile} />
            </Link>
          </Menu.Item>
          <Menu.Item key="/user/logout" icon={<LogoutOutlined />} onClick={logoutAction}>
            <FormattedMessage {...messages.logout} />
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  )
}
