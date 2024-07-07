import { useApiUrl, useCustom, useGo } from '@refinedev/core'
import { Button, Flex, Input, Typography } from 'antd'
import { API_KEY } from '../../constant'
import { useCallback, useEffect, useState } from 'react'
import { Location } from '../../interfaces/geocoding'
import { addItem } from './history-search'
import { SearchHistory } from './components/search-history'

export const HistoryList = () => {
  const apiUrl = useApiUrl()
  const go = useGo()
  const [query, setQuery] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { data, refetch, isFetching, isFetched } = useCustom<Location[]>({
    url: `${apiUrl}/geo/1.0/direct`,
    method: 'get',
    config: {
      query: {
        q: query,
        appid: API_KEY
      }
    },
    queryOptions: {
      enabled: false
    }
  })

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      setError('')
      addItem({ ...data.data[0] })
      go({
        query: {
          lat: data.data[0].lat,
          lon: data.data[0].lon,
          name: data.data[0].name,
          country: data.data[0].country
        },
        to: '/weather'
      })
    } else if (isFetched) {
      setError('Invalid country or city')
    }
  }, [data])

  const handleOnchangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.target.value)
  }, [])

  const handleSearchLocation = useCallback(async () => {
    try {
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Flex vertical gap={'large'}>
      <Flex vertical>
        <Flex gap={'small'}>
          <Input placeholder='Search country or city here...' onChange={handleOnchangeSearch} />
          <Button type='primary' onClick={handleSearchLocation} loading={isFetching} disabled={query.length === 0}>
            Search
          </Button>
        </Flex>
        {error && <Typography.Text type='danger'>{error}</Typography.Text>}
      </Flex>
      <SearchHistory />
    </Flex>
  )
}
