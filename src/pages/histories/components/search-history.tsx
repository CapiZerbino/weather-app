import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { useGo } from '@refinedev/core'
import { Button, Card, Flex, List, Space, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { clearItem, getItems } from '../history-search'
import { Location } from '../../../interfaces/geocoding'
import { useMainLayoutContext } from '../../../components/layout'

export const SearchHistory: React.FC = () => {
  const go = useGo()
  const { setCurrentLocationName } = useMainLayoutContext()
  const [searchHistories, setSearchHistories] = useState<Location[]>([])

  useEffect(() => {
    getItems().then((value) => {
      setSearchHistories(value)
    })
  }, [])

  const handleClearSearchHistoryItem = useCallback(async (id: number) => {
    try {
      await clearItem(id)
      await getItems().then((value) => {
        setSearchHistories(value)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleSearchHistoryItem = useCallback((history: Location) => {
    setCurrentLocationName([history.name, history.country].join(', '))
    go({
      query: {
        lat: history.lat,
        lon: history.lon,
        name: history.name,
        country: history.country
      },
      to: '/weather'
    })
  }, [])

  return (
    <Flex vertical gap={'middle'}>
      <Typography.Text strong>Search History</Typography.Text>
      <Card>
        <List
          dataSource={searchHistories}
          renderItem={(history, index) => {
            return (
              <Flex key={index} gap={'small'} align='center' justify='space-between'>
                <Typography.Text strong>{[history.name, history.country].join(', ')}</Typography.Text>
                <Space>
                  <Button
                    type='text'
                    onClick={() => {
                      handleSearchHistoryItem(history)
                    }}
                    icon={<SearchOutlined />}
                  />
                  <Button
                    type='text'
                    onClick={() => {
                      handleClearSearchHistoryItem(history.id)
                    }}
                    icon={<DeleteOutlined />}
                  />
                </Space>
              </Flex>
            )
          }}
        />
      </Card>
    </Flex>
  )
}
