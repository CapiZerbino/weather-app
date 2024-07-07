export interface LocalNames {
  [languageCode: string]: string
}

export interface Location {
  id: number
  name: string
  local_names?: LocalNames
  lat: number
  lon: number
  country: string
  state?: string
}
