export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
  sea_level?: number
  grnd_level?: number
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Clouds {
  all: number
}

export interface Rain {
  '1h'?: number
  '3h'?: number
}

export interface Snow {
  '1h'?: number
  '3h'?: number
}

export interface Sys {
  type?: number
  id?: number
  message?: number
  country: string
  sunrise: number
  sunset: number
}

export interface WeatherData {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  rain?: Rain
  snow?: Snow
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Forecast {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  rain?: Rain
  snow?: Snow
  visibility: number
  pop: number
  sys: Sys
  dt_txt: string
}

export interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: Forecast[]
}
