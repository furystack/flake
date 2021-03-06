import { SettingsTypeName, EntityApiSchemas, Settings } from 'common'
import { ResponseError } from '@furystack/rest-client-fetch'
import { FC, useEffect, useMemo, useRef } from 'react'
import MonacoEditor, { monaco } from 'react-monaco-editor'
import { useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import { useHotkey } from '../../../hooks/use-hotkex'
import { useSettingsApiContext } from '../../../hooks/use-settings-api'

export const SettingEditor: FC<{ setting: SettingsTypeName; data: Settings }> = ({ setting, data }) => {
  const dataValue = useMemo(() => JSON.stringify(data, undefined, 2), [data])
  const uri = useMemo(() => monaco.Uri.parse(`flake://settings/${setting}`), [setting])
  const monacoRef = useRef<MonacoEditor>(null)
  const api = useSettingsApiContext()
  const queryClient = useQueryClient()
  const snack = useSnackbar()

  useHotkey({
    key: 's',
    ctrlKey: true,
    stopPropagation: true,
    preventDefault: true,
    onTriggered: async () => {
      const s = snack.enqueueSnackbar('Saving setting...', { variant: 'info' })
      try {
        await api({
          method: 'PUT',
          action: '/system',
          body: {
            ...JSON.parse(monacoRef?.current?.editor?.getValue() || '{}'),
            type: setting,
          },
        })

        snack.enqueueSnackbar('Settings saved', { variant: 'success' })
        queryClient.invalidateQueries(['GET_SYSTEM_SETTING'])
      } catch (error) {
        snack.enqueueSnackbar(
          error instanceof ResponseError ? (await error.response.json()).message || 'Something went wrong' : error,
          { variant: 'error' },
        )
      } finally {
        snack.closeSnackbar(s)
      }
    },
  })

  useEffect(() => {
    if (monacoRef.current && monacoRef.current.editor && uri) {
      if (!monaco.editor.getModel(uri)) {
        const model = monaco.editor.createModel(dataValue, 'json', uri)
        model.setEOL(0)
        monacoRef.current.editor?.setModel(model)
      } else {
        monacoRef.current.editor.setModel(monaco.editor.getModel(uri))
        monacoRef.current.editor.setValue(dataValue)
      }
    }
  }, [dataValue, setting, uri])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MonacoEditor
        ref={monacoRef}
        width="100%"
        height="100%"
        language="json"
        theme="vs-dark"
        value={dataValue}
        options={{
          smoothScrolling: true,
          automaticLayout: true,
        }}
        onChange={() => {
          /** */
        }}
        editorDidMount={() => {
          /** */
        }}
        editorWillMount={(m) => {
          const refName = Object.keys(EntityApiSchemas.definitions).find((key) =>
            key.toLowerCase().includes(`${setting.toLocaleLowerCase()}settings`),
          )
          m.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
              {
                uri: uri.toString(),
                fileMatch: [uri.toString()],
                schema: { ...EntityApiSchemas, $ref: `#/definitions/${refName}` },
              },
            ],
          })
        }}
      />
    </div>
  )
}
