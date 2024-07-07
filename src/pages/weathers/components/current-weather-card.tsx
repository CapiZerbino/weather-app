import { Card, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import { WeatherData } from '../../../interfaces/weather'
import { StatisticWeatherItem } from './statistic-weather-item'
import { ArrowUpOutlined } from '@ant-design/icons'
interface CurrentWeatherCardProps {
  weather?: WeatherData
  loading?: boolean
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, loading }) => {
  return (
    <Card loading={loading}>
      <Typography.Text strong>{dayjs().format('LL')}</Typography.Text>
      <Flex align='center' justify='center'>
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt='' />
        <Flex vertical>
          <Typography.Text
            strong
            style={{
              fontSize: 30
            }}
          >
            {weather?.main.temp} °C{' '}
          </Typography.Text>
          <Typography.Text
            strong
            style={{
              textTransform: 'capitalize'
            }}
          >
            {weather?.weather[0].description}
          </Typography.Text>
        </Flex>
      </Flex>
      <Flex align='center' justify='space-between'>
        <StatisticWeatherItem label='Humidity' value={weather?.main?.humidity} unit='%' />
        <StatisticWeatherItem
          label='Winds'
          value={weather?.wind.speed}
          unit='m/s'
          prefixIcon={<ArrowUpOutlined />}
          rotatePrefixIconDeg={weather?.wind?.deg}
        />
        <StatisticWeatherItem label='Visibility' value={weather?.visibility} unit='km' />
      </Flex>
    </Card>
  )
}
