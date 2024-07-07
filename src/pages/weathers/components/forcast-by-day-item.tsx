import { Card, Flex, Typography } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Forecast } from '../../../interfaces/weather'
import { ForecastLineItem } from './forecast-line-item'

interface ForecastByDayItemProps {
  day: Dayjs
  forecasts: Forecast[]
}

export const ForecastByDayItem: React.FC<ForecastByDayItemProps> = ({ day, forecasts }) => {
  const getDayOfItem = () => {
    if (day.isSame(dayjs(), 'day')) {
      return 'Today'
    }
    return day.format('DD MMMM')
  }

  return (
    <Card
      bordered={false}
      styles={{
        body: {
          padding: 0
        }
      }}
    >
      <Typography.Text type='secondary'>{getDayOfItem()}</Typography.Text>
      <Flex vertical>
        {forecasts.map((forecast, index) => {
          return <ForecastLineItem forecast={forecast} key={index} />
        })}
      </Flex>
    </Card>
  )
}
