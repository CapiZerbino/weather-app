import { Flex, Space, Typography } from 'antd'
import React from 'react'

interface StatisticWeatherItemProps {
  label?: string
  value?: string | number
  unit?: string
  prefixIcon?: React.ReactNode
  rotatePrefixIconDeg?: number
}

export const StatisticWeatherItem: React.FC<StatisticWeatherItemProps> = ({
  label,
  value,
  unit,
  prefixIcon,
  rotatePrefixIconDeg
}) => {
  return (
    <Space direction='vertical' align='center'>
      <Typography.Text type='secondary' strong>
        {label}
      </Typography.Text>
      <Flex>
        {prefixIcon && (
          <span
            style={{
              display: 'inline-block',
              transform: `rotate(${rotatePrefixIconDeg ?? 0}deg)`
            }}
          >
            {prefixIcon}
          </span>
        )}
        <Typography.Text strong>
          {value}{' '}
          <span
            style={{
              fontSize: 10
            }}
          >
            {unit}
          </span>
        </Typography.Text>
      </Flex>
    </Space>
  )
}
