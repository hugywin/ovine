import cls from 'classnames'
import { pick } from 'lodash'
import { observer, inject } from 'mobx-react'
import React, { useEffect, useRef } from 'react'

import { app } from '@core/app'

import { Editor } from '../../assets/scripts/editor.view'

import { GlobalEditorStyle } from './styled'

export default inject('store')(
  observer((props) => {
    const { isPreview, setEditorInstance, setLastSavedSchema, option } = props.store
    const { editorStore } = props
    const $editor = useRef(null)
    const editorProps = pick(option, [
      'plugins',
      'isMobile',
      'autoFocus',
      'schemaFilter',
      'className',
      'amisEnv',
      'ctx',
    ])
    const { className } = editorProps
    const editorData = {
      ...option.data,
      ...app.amis.constants, // 默认兼容 常量的支持
    }

    useEffect(() => {
      setEditorInstance($editor.current) // 主要用历史记录更新
      setLastSavedSchema(editorStore.schema) // 第一次存储初始化数据

      return () => {
        setEditorInstance()
      }
    }, [])

    return (
      <div className={cls(className, { 'd-none': isPreview })}>
        <GlobalEditorStyle />
        <Editor
          {...editorProps}
          ref={$editor}
          data={editorData}
          preview={false}
          className="is-fixed"
          theme={app.theme.getName()}
          value={editorStore.schema}
          onChange={(value: any) => editorStore.updateSchema(value)}
        />
      </div>
    )
  })
)
