import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd'
import { Layout as AntdLayout, Button, Flex, theme, Typography } from 'antd'
import React from 'react'
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import { useGo } from '@refinedev/core'
import { useMainLayoutContext } from '../layout'

const { Text } = Typography
const { useToken } = theme

type IUser = {
  id: number
  name: string
  avatar: string
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
  const { token } = useToken()
  const go = useGo()
  const { currentLocationName } = useMainLayoutContext()

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 24px',
    height: '64px'
  }

  if (sticky) {
    headerStyles.position = 'sticky'
    headerStyles.top = 0
    headerStyles.zIndex = 1
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Flex gap={'small'}>
        <EnvironmentOutlined />
        {currentLocationName && <Typography.Text strong>{currentLocationName}</Typography.Text>}
      </Flex>
      <Button
        type='text'
        icon={<SearchOutlined />}
        onClick={() => {
          go({ to: '/history' })
        }}
      ></Button>
    </AntdLayout.Header>
  )
}
