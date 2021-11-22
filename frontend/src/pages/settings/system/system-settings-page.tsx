import { Skeleton } from '@mui/material'
import { SettingsTypeName } from 'common'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { useSettingsApiContext } from '../../../hooks/use-settings-api'
import { SettingEditor } from './setting-editor'
import { SystemSettingsSider } from './sider'

export const SystemSettingsPage: FC<{ setting?: SettingsTypeName }> = ({ setting }) => {
  const api = useSettingsApiContext()
  const { data, isLoading, error } = useQuery(
    ['GET_SYSTEM_SETTING', setting],
    () =>
      api({
        method: 'GET',
        action: '/system/:id',
        url: {
          id: setting as SettingsTypeName,
        },
        query: {
          select: ['type', 'value'],
        },
      }),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <SystemSettingsSider active={setting} />
      {!setting ? null : isLoading ? (
        <Skeleton />
      ) : error ? (
        <SettingEditor setting={setting} data={{ type: setting } as any} />
      ) : (
        data && <SettingEditor setting={setting} data={data.result} />
      )}
    </div>
  )
}
