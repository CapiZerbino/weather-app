import { useApiUrl, useCustom, useGo, useParsed } from '@refinedev/core'
import { Card, Flex, Typography } from 'antd'
import { API_KEY } from '../../constant'
import { Forecast, ForecastResponse, WeatherData } from '../../interfaces/weather'
import dayjs from 'dayjs'
import { CurrentWeatherCard } from './components/current-weather-card'
import { ForecastByDayItem } from './components/forcast-by-day-item'
import { useMainLayoutContext } from '../../components/layout'

interface WeatherParams {
  lat: number
  lon: number
  name: string
  country: string
}

export const WeatherList = () => {
  const apiUrl = useApiUrl()
  const { params } = useParsed<WeatherParams>()
  const go = useGo()
  const { setCurrentLocationName } = useMainLayoutContext()
  // Redirect to history page if lat or lon or name or country is not available
  if (!params?.lat || !params?.lon || !params?.name || !params?.country) {
    go({
      to: '/history'
    })
    return
  }
  setCurrentLocationName([params?.name, params?.country].join(', '))

  // Fetch current weather data
  const { data: currentWeatherData, isLoading: isLoadingCurrentWeather } = useCustom<WeatherData>({
    url: `${apiUrl}/data/2.5/weather`,
    method: 'get',
    config: {
      query: {
        lat: params?.lat,
        lon: params?.lon,
        appid: API_KEY,
        units: 'metric'
      }
    }
  })

  // Fetch forecast data
  const { data: forecastData, isLoading: isLoadingForecast } = useCustom<ForecastResponse>({
    url: `${apiUrl}/data/2.5/forecast`,
    method: 'get',
    config: {
      query: {
        lat: params?.lat,
        lon: params?.lon,
        appid: API_KEY
      }
    }
  })

  // Filter and segregate forecast data into different days
  const filteredForecast = forecastData?.data?.list?.reduce((acc: any, forecast: Forecast) => {
    const date = forecast.dt_txt.split(' ')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(forecast)
    return acc
  }, {})

  return (
    <Flex vertical gap={'large'}>
      <CurrentWeatherCard weather={currentWeatherData?.data} loading={isLoadingCurrentWeather} />
      <Typography.Title level={3}>5-day Forecast (3 Hours)</Typography.Title>
      <Card bordered loading={isLoadingForecast}>
        <Flex vertical>
          {Object.keys(filteredForecast ?? {}).map((date, index) => {
            return <ForecastByDayItem key={index} day={dayjs(date)} forecasts={filteredForecast[date]} />
          })}
        </Flex>
      </Card>
    </Flex>
  )
}
