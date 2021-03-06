/**
 * TODO: 优化 ContextMenu 样式
 */

import { ContextMenu } from 'amis'
import React from 'react'

import { app } from '@core/app'

import Layout from '@/components/layout'
import { RootProvider, rootStore } from '@/stores'

export default () => {
  return (
    <RootProvider value={rootStore}>
      <>
        <ContextMenu theme={app.theme.getName()} />
        <Layout />
      </>
    </RootProvider>
  )
}

if (module.hot) {
  module.hot.accept((error) => {
    // eslint-disable-next-line
    console.error(error)
  })
}
