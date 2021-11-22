import { Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import { SettingsTypeName, SettingsTypeNames } from 'common'
import { FC } from 'react'
import { Link } from 'react-router-dom'
export const SystemSettingsSider: FC<{ active?: SettingsTypeName }> = ({ active }) => {
  return (
    <Drawer variant="permanent" sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}>
      <List sx={{ paddingTop: '64px' }}>
        {SettingsTypeNames.map((setting) => (
          <ListItemButton
            component={Link}
            key={setting}
            sx={{ fontWeight: active ? 'bolder' : 'initial' }}
            to={`/settings/system/${setting.toLowerCase()}`}>
            <ListItemText primary={setting} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
