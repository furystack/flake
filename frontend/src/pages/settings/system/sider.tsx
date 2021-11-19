import { Menu } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { SettingsTypeName, SettingsTypeNames } from 'common'
import { FC } from 'react'
import { Link } from 'react-router-dom'
export const SystemSettingsSider: FC<{ active?: SettingsTypeName }> = ({ active }) => {
  return (
    <Sider width={200} className="site-layout-background" collapsedWidth={0} breakpoint="sm">
      <Menu mode="inline" defaultSelectedKeys={active ? [active] : []} style={{ height: '100%', borderRight: 0 }}>
        {SettingsTypeNames.map((setting) => (
          <Menu.Item key={setting}>
            <Link to={`/settings/system/${setting.toLowerCase()}`}>{setting}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}
