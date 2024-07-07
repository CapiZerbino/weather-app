import { Flex, Typography } from 'antd'
import { Forecast } from '../../../interfaces/weather'
import dayjs from 'dayjs'

interface ForecastLineItemProps {
  forecast: Forecast
}

export const ForecastLineItem: React.FC<ForecastLineItemProps> = ({ forecast }) => {
  return (
    <Flex justify='space-between' align='center'>
      <Flex align='center'>
        <Typography.Text
          strong
          style={{
            width: 60
          }}
        >
          {dayjs(forecast.dt_txt).format('HH:MM')}
        </Typography.Text>
        <Flex justify='start' align='center'>
          <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt='' />
          <Typography.Text type='secondary'>
            {forecast.main.temp_min} / {forecast.main.temp_max} °C
          </Typography.Text>
        </Flex>
      </Flex>
      <Typography.Text
        strong
        style={{
          textAlign: 'right'
        }}
      >
        {forecast.weather[0].description}
      </Typography.Text>
    </Flex>
  )
}
